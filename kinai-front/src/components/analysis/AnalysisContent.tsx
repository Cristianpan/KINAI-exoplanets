"use client";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import FileDropZone from "@/components/common/FileDropZone";
import { ParameterMappingModal } from "./index";
import { useCSVProcessor } from "@/hooks/useCSVProcessor";
import { EXOPLANET_SCHEMA } from "@/config/exoplanetSchema";


export default function AnalysisContent() {
  const [, setSelectedFile] = useState<File | null>(null);
  const [showMappingModal, setShowMappingModal] = useState(false);

  const {
    csvData,
    mappings,
    mappedData,
    processCSVFile,
    initializeMappings,
    updateMapping,
    generateMappedData,
    isMappingComplete,
  } = useCSVProcessor({
    onDataProcessed: (data) => {
      console.log("CSV procesado:", data);
      setShowMappingModal(true);
    }
  });

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      await processCSVFile(files[0]);
    }
  };

  const handleAnalyzeWithAI = () => {
    console.log("Analizar con IA - Datos mapeados:", mappedData);
    // Aquí puedes implementar la lógica de análisis con los datos mapeados
  };

  const handleUseExampleData = () => {
    console.log("Usar datos de ejemplo");
    // Aquí puedes cargar datos de ejemplo
  };

  const handleMappingChange = (schemaId: string, csvColumn: string) => {
    updateMapping(schemaId, csvColumn);
  };

  const handleConfirmMapping = () => {
    // Generate preview data first
    generateMappedData(EXOPLANET_SCHEMA, 10);
    setShowMappingModal(false);
  };

  const handleCancelMapping = () => {
    setShowMappingModal(false);
    // Don't reset the CSV data - keep the file uploaded
  };

  const handleEditFile = () => {
    setShowMappingModal(true);
  };

  // Initialize mappings when CSV is processed
  useEffect(() => {
    if (csvData && mappings.length === 0) {
      initializeMappings(EXOPLANET_SCHEMA);
    }
  }, [csvData, mappings.length, initializeMappings]);

  return (
    <Box sx={{padding: "8rem 4rem", maxWidth: "1220px", mx: "auto"}}>
      <Typography variant="h2" sx={{mt: "3rem"}}>Análisis de Datos</Typography>
      <Typography variant="body2" sx={{mt: "1rem", color: "secondary.dark", mb: "3rem"}}>
        Carga y analiza tus datos para detectar exoplanetas con IA
      </Typography>
      
      {/* FileDropZone - always visible */}
      <FileDropZone
        onFilesSelected={handleFilesSelected}
        onAnalyzeWithAI={handleAnalyzeWithAI}
        onUseExampleData={handleUseExampleData}
        onEditFile={csvData ? () => handleEditFile() : undefined}
        processedFiles={csvData ? [true] : []}
        maxFileSize={100}
        acceptedTypes={[".csv", ".txt"]}
        maxFiles={1}
      />

      {/* Step 2: Mapping Modal */}
      {csvData && (
        <ParameterMappingModal
          open={showMappingModal}
          onClose={handleCancelMapping}
          onConfirm={handleConfirmMapping}
          csvData={csvData}
          schemas={EXOPLANET_SCHEMA}
          mappings={mappings}
          onMappingChange={handleMappingChange}
          isComplete={isMappingComplete(EXOPLANET_SCHEMA)}
          mappedData={mappedData}
        />
      )}
    </Box>
  );
}