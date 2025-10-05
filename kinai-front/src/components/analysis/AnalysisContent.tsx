"use client";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { useState, useEffect } from "react";
import FileDropZone from "@/components/common/FileDropZone";
import { ParameterMappingModal } from "./index";
import { useCSVProcessor } from "@/hooks/useCSVProcessor";
import { usePrediction } from "@/hooks/usePrediction";
import {
  EXOPLANET_SCHEMA,
  EXOPLANET_SCHEMA_EXTENDED,
} from "@/config/exoplanetSchema";
import ActionButtons from "../common/FileDropZone/ActionButtons";

export default function AnalysisContent() {
  const [, setSelectedFile] = useState<File | null>(null);
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("simple");
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

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

  const { predictionState, makePrediction, resetPrediction } = usePrediction();

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
    resetPrediction();
  };

  const handleAnalyzeWithAI = async () => {
    if (
      !csvData ||
      !isMappingComplete(
        selectedModel === "simple"
          ? EXOPLANET_SCHEMA
          : EXOPLANET_SCHEMA_EXTENDED
      )
    ) {
      setShowErrorSnackbar(true);
      return;
    }

    try {
      // Prepare data for API
      const predictionData = {
        mappings: mappings.map((mapping) => ({
          schemaId: mapping.schemaId,
          csvColumn: mapping.csvColumn,
        })),
        csvData: {
          headers: csvData.headers,
          rows: csvData.rows,
          totalRows: csvData.totalRows,
        },
      };

      // Make prediction
      await makePrediction(
        predictionData,
        selectedModel as "simple" | "complex"
      );
    } catch (error) {
      console.error("Error making prediction:", error);
      setShowErrorSnackbar(true);
    }
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

  useEffect(() => {
    reset();
    resetPrediction();
    // setSelectedFile(null);
    setShowMappingModal(false);
  }, [selectedModel, reset, resetPrediction]);

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
        Data Analysis
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
        Load and analyze your data to detect exoplanets with AI
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
          hasFiles={
            !!csvData &&
            isMappingComplete(
              selectedModel === "simple"
                ? EXOPLANET_SCHEMA
                : EXOPLANET_SCHEMA_EXTENDED
            )
          }
          isLoading={predictionState.isLoading}
          onAnalyzeWithAI={handleAnalyzeWithAI}
        />
        {/* FileDropZone - always visible */}
      </Box>
      <FileDropZone
        onFilesSelected={handleFilesSelected}
        onAnalyzeWithAI={handleAnalyzeWithAI}
        onEditFile={csvData ? () => handleEditFile() : undefined}
        onFileRemoved={handleFileRemoved}
        processedFiles={csvData ? [true] : []}
        maxFileSize={100}
        acceptedTypes={[".csv"]}
        maxFiles={1}
      />

      {/* Results Section */}
      {predictionState.isComplete && predictionState.result && (
        <Box sx={{ mt: "3rem" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 500, fontSize: "2.4rem", mb: "2rem" }}
          >
            Analysis Results
          </Typography>

          <Box
            sx={{
              border: "1px solid",
              borderColor: "grey.200",
              borderRadius: "1rem",
              padding: "2rem",
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
              flexWrap: "wrap",
              backgroundColor: "rgba(95, 120, 231, 0.1)",
            }}
          >
            {predictionState.result.results.map(({ search_id, prediction }) => (
              <>
                <Box
                  sx={{
                    padding: "2rem",
                    backgroundColor: "common.white",
                    borderRadius: "1rem",
                    border: "1px solid",
                    borderColor: "grey.200",
                    flex: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "secondary.dark", fontWeight: 500 }}
                  >
                    {search_id}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                      bgcolor:
                        prediction === 1 ? "secondary.light" : "grey.700",
                      padding: "0.5rem 1rem",
                      borderRadius: "1rem",
                      fontSize: "1rem",
                      color: "white",
                      mt: "1rem",
                    }}
                  >
                    {prediction === 1 ? "exoplanet" : "not exoplanet"}
                  </Typography>
                </Box>
              </>
            ))}
          </Box>
        </Box>
      )}

      {/* Loading State */}
      {predictionState.isLoading && (
        <Box
          sx={{
            mt: "3rem",
            p: "3rem",
            textAlign: "center",
            backgroundColor: "grey.50",
            borderRadius: "1rem",
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Typography variant="h4" sx={{ mb: "1rem", color: "secondary.dark" }}>
            Processing with AI...
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Analyzing your data with the {" "}
            {selectedModel === "simple" ? "simple" : "complex"} model
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {predictionState.error && (
        <Box sx={{ mt: "3rem" }}>
          <Alert severity="error" sx={{ borderRadius: "1rem" }}>
            <Typography variant="h6" sx={{ mb: "0.5rem" }}>
              Error en el Análisis
            </Typography>
            <Typography variant="body2">{predictionState.error}</Typography>
          </Alert>
        </Box>
      )}

      {/* Backend Errors */}
      {predictionState.result?.errors &&
        predictionState.result.errors.length > 0 && (
          <Box sx={{ mt: "2rem" }}>
            <Alert severity="warning" sx={{ borderRadius: "1rem" }}>
              <Typography variant="h6" sx={{ mb: "0.5rem" }}>
                Errores en las Predicciones
              </Typography>
              <Box sx={{ maxHeight: "200px", overflowY: "auto" }}>
                {predictionState.result.errors.map((error, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: "0.5rem" }}>
                    • {error}
                  </Typography>
                ))}
              </Box>
            </Alert>
          </Box>
        )}

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

      {/* Error Snackbar */}
      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowErrorSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowErrorSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please complete the parameter mapping before analyzing.
        </Alert>
      </Snackbar>
    </Box>
  );
}
