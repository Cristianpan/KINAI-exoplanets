import { useState, useCallback } from 'react';
import { CSVData, ColumnSchema, ColumnMapping, MappedData } from '@/interfaces/columnMapping';
import Papa from 'papaparse';

interface UseCSVProcessorProps {
  onDataProcessed?: (data: CSVData) => void;
  onMappingComplete?: (mappedData: MappedData[]) => void;
}

export const useCSVProcessor = ({ onDataProcessed, onMappingComplete }: UseCSVProcessorProps = {}) => {
  const [csvData, setCsvData] = useState<CSVData | null>(null);
  const [mappings, setMappings] = useState<ColumnMapping[]>([]);
  const [mappedData, setMappedData] = useState<MappedData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const parseCSV = useCallback((csvText: string): CSVData => {
    const result = Papa.parse(csvText, {
      header: true, // usa la primera fila como headers
      skipEmptyLines: true,
    });

    const headers = result.meta.fields || [];
    const rows = result.data as string[][];

    console.log({
      headers,
      rows,
      totalRows: rows.length
    })

    return {
      headers,
      rows,
      totalRows: rows.length
    };
  }, []);

  const processCSVFile = useCallback(async (file: File) => {
    setIsProcessing(true);
    try {
      const text = await file.text();
      const data = parseCSV(text);
      setCsvData(data);
      onDataProcessed?.(data);
    } catch (error) {
      console.error('Error processing CSV:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [parseCSV, onDataProcessed]);

  const initializeMappings = useCallback((schemas: ColumnSchema[]) => {
    if (!csvData) return;

    const initialMappings: ColumnMapping[] = schemas.map(schema => ({
      schemaId: schema.id,
      csvColumn: '',
      mapped: false
    }));

    setMappings(initialMappings);
  }, [csvData]);

  const updateMapping = useCallback((schemaId: string, csvColumn: string) => {
    setMappings(prev => prev.map(mapping => 
      mapping.schemaId === schemaId 
        ? { ...mapping, csvColumn, mapped: !!csvColumn }
        : mapping
    ));
  }, []);

  const generateMappedData = useCallback((schemas: ColumnSchema[], previewRows: number = 10) => {
    if (!csvData || !mappings.length) return;

    const schemaMap = schemas.reduce((acc, schema) => {
      acc[schema.id] = schema;
      return acc;
    }, {} as Record<string, ColumnSchema>);

    const mappedRows: MappedData[] = [];
    const rowsToProcess = Math.min(previewRows, csvData.rows.length);

    for (let i = 0; i < rowsToProcess; i++) {
      const row = csvData.rows[i];
      const mappedRow: MappedData = {};

      mappings.forEach(mapping => {
        if (mapping.mapped && mapping.csvColumn) {
          const csvColumnIndex = csvData.headers.indexOf(mapping.csvColumn);
          if (csvColumnIndex !== -1) {
            const value = row[csvColumnIndex];
            const schema = schemaMap[mapping.schemaId];
            
            // Convert value based on data type
            let convertedValue: string | number | boolean | Date | null = value;
            if (schema) {
              switch (schema.dataType) {
                case 'number':
                  const parsed = parseFloat(value);
                  convertedValue = isNaN(parsed) ? 0 : parsed;
                  // Debug log for number conversion issues
                  if (value && isNaN(parsed)) {
                    console.warn(`Failed to parse number: "${value}" for column ${mapping.csvColumn}`);
                  }
                  break;
                case 'boolean':
                  convertedValue = value.toLowerCase() === 'true' || value === '1';
                  break;
                case 'date':
                  convertedValue = new Date(value);
                  break;
                case 'lightcurve':
                    convertedValue = "Light Curve"
                default:
                  convertedValue = String(value);
              }
            }
            
            mappedRow[mapping.schemaId] = convertedValue;
          }
        }
      });

      mappedRows.push(mappedRow);
    }

    setMappedData(mappedRows);
    onMappingComplete?.(mappedRows);
  }, [csvData, mappings, onMappingComplete]);

  const isMappingComplete = useCallback((schemas: ColumnSchema[]) => {
    const requiredSchemas = schemas.filter(schema => schema.required);
    return requiredSchemas.every(schema => 
      mappings.some(mapping => 
        mapping.schemaId === schema.id && mapping.mapped
      )
    );
  }, [mappings]);

  const reset = useCallback(() => {
    setMappings([]);
    setMappedData([]);
  }, []);

  return {
    csvData,
    mappings,
    mappedData,
    isProcessing,
    processCSVFile,
    initializeMappings,
    updateMapping,
    generateMappedData,
    isMappingComplete,
    reset
  };
};
