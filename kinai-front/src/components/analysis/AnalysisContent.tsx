"use client";
import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import FileDropZone from "@/components/common/FileDropZone";
import { ParameterMappingModal } from "./index";
import { useCSVProcessor } from "@/hooks/useCSVProcessor";
import { EXOPLANET_SCHEMA, EXOPLANET_SCHEMA_EXTENDED } from "@/config/exoplanetSchema";
import ActionButtons from "../common/FileDropZone/ActionButtons";
import { ResultsTable } from "../common/ResultsTable";

export default function AnalysisContent() {
  const [, setSelectedFile] = useState<File | null>(null);
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("simple");

  const {
    csvData,
    mappings,
    mappedData,
    processCSVFile,
    initializeMappings,
    updateMapping,
    generateMappedData,
    isMappingComplete,
    reset,
  } = useCSVProcessor({
    onDataProcessed: () => {
      setShowMappingModal(true);
    },
  });

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      await processCSVFile(files[0]);
    }
  };

  const handleFileRemoved = () => {
    setSelectedFile(null);
    setShowMappingModal(false);
    reset();
  };

  const handleAnalyzeWithAI = () => {
    if(selectedModel === "simple") {
        const data = { mappings, csvData }

        console.log(data);
    }
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
    generateMappedData(
      selectedModel === "simple" ? EXOPLANET_SCHEMA : EXOPLANET_SCHEMA_EXTENDED,
      10
    );
    setShowMappingModal(false);
  };

  const handleCancelMapping = () => {
    setShowMappingModal(false);
    // Don't reset the CSV data - keep the file uploaded
  };

  const handleEditFile = () => {
    setShowMappingModal(true);
  };


  // Reiniciar datos y mapeos cuando cambie el modelo
  useEffect(() => {
    reset();
    // setSelectedFile(null);
    setShowMappingModal(false);
  }, [selectedModel]);

  // Initialize mappings when CSV is processed
  useEffect(() => {
    if (csvData && mappings.length === 0) {
      initializeMappings(
        selectedModel === "simple"
          ? EXOPLANET_SCHEMA
          : EXOPLANET_SCHEMA_EXTENDED
      );
    }
  }, [csvData, mappings.length, initializeMappings, selectedModel]);

  return (
    <Box sx={{ padding: "8rem 4rem", maxWidth: "1220px", mx: "auto" }}>
      <Typography variant="h2" sx={{ mt: "3rem", textAlign: "center" }}>
        Análisis de Datos
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mt: "1rem",
          color: "secondary.dark",
          mb: "2rem",
          textAlign: "center",
        }}
      >
        Carga y analiza tus datos para detectar exoplanetas con IA
      </Typography>
      {/* Model Selector */}
      <Box sx={{ mb: "2rem" }}>
        <FormControl sx={{ minWidth: 200, mr: "2rem" }}>
          <Select
            id="model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            displayEmpty
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E0E0E0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondary.main",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondary.main",
              },
              "& .MuiSelect-select": {
                p: "1rem",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "common.white",
                  "& .MuiMenuItem-root": {
                    fontSize: "1.2rem",
                    "&.Mui-selected": {
                      backgroundColor: "secondary.light",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "secondary.light",
                      },
                    },
                    "&:hover": {
                      backgroundColor: "rgba(112, 135, 234, 0.1)",
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="simple">
              <Typography sx={{ fontSize: "1.6rem" }}>Simple</Typography>
            </MenuItem>
            <MenuItem value="complex">
              <Typography sx={{ fontSize: "1.6rem" }}>Complex</Typography>
            </MenuItem>
          </Select>
        </FormControl>
        <ActionButtons
          hasFiles={!!csvData && isMappingComplete(
            selectedModel === "simple"
              ? EXOPLANET_SCHEMA
              : EXOPLANET_SCHEMA_EXTENDED
          )}
          onAnalyzeWithAI={handleAnalyzeWithAI}
        />
        {/* FileDropZone - always visible */}
      </Box>
      <FileDropZone
        onFilesSelected={handleFilesSelected}
        onAnalyzeWithAI={handleAnalyzeWithAI}
        onUseExampleData={handleUseExampleData}
        onEditFile={csvData ? () => handleEditFile() : undefined}
        onFileRemoved={handleFileRemoved}
        processedFiles={csvData ? [true] : []}
        maxFileSize={100}
        acceptedTypes={[".csv", ".txt"]}
        maxFiles={1}
      />

      <ResultsTable datasets={[]} onViewDataset={() => {}} />

      {/* Step 2: Mapping Modal */}
      {csvData && (
        <ParameterMappingModal
          open={showMappingModal}
          onClose={handleCancelMapping}
          onConfirm={handleConfirmMapping}
          csvData={csvData}
          schemas={
            selectedModel === "simple"
              ? EXOPLANET_SCHEMA
              : EXOPLANET_SCHEMA_EXTENDED
          }
          mappings={mappings}
          onMappingChange={handleMappingChange}
          isComplete={isMappingComplete(
            selectedModel === "simple"
              ? EXOPLANET_SCHEMA
              : EXOPLANET_SCHEMA_EXTENDED
          )}
          mappedData={mappedData}
        />
      )}
    </Box>
  );
}
