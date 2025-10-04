export interface ColumnSchema {
  id: string;
  label: string;
  description: string;
  required: boolean;
  dataType: 'string' | 'number' | 'date' | 'boolean';
  example?: string;
}

export interface ColumnMapping {
  schemaId: string;
  csvColumn: string;
  mapped: boolean;
}

export interface MappedData {
  [key: string]: string | number | boolean | Date | null;
}

export interface CSVData {
  headers: string[];
  rows: string[][];
  totalRows: number;
}

export interface ColumnMappingState {
  csvData: CSVData | null;
  mappings: ColumnMapping[];
  mappedData: MappedData[];
  isMappingComplete: boolean;
}
