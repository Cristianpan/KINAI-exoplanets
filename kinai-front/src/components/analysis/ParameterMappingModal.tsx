"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  ColumnSchema,
  CSVData,
  ColumnMapping,
  MappedData,
} from "@/interfaces/columnMapping";

interface ParameterMappingModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (mappings: ColumnMapping[]) => void;
  csvData: CSVData | null;
  schemas: ColumnSchema[];
  mappings: ColumnMapping[];
  onMappingChange: (schemaId: string, csvColumn: string) => void;
  isComplete: boolean;
  mappedData?: MappedData[];
}

export default function ParameterMappingModal({
  open,
  onClose,
  onConfirm,
  csvData,
  schemas,
  mappings,
  onMappingChange,
  isComplete,
  mappedData = [],
}: ParameterMappingModalProps) {
  const [localMappedData, setLocalMappedData] = useState<MappedData[]>([]);

  const handleConfirm = () => {
    onConfirm(mappings);
    onClose();
  };

  const handleClose = () => {
    setLocalMappedData([]);
    onClose();
  };

  const formatValue = (
    value: string | number | boolean | Date | null,
    dataType: string
  ) => {
    if (value === null || value === undefined) return "-";

    switch (dataType) {
      case "number":
        return typeof value === "number" ? value.toFixed(2) : value;
      case "boolean":
        return value ? "Sí" : "No";
      case "date":
        return value instanceof Date
          ? value.toLocaleDateString()
          : new Date(value as string).toLocaleDateString();
      default:
        return String(value);
    }
  };

  const getPreviewData = () => {
    // Use local data if available, otherwise use passed mappedData
    return localMappedData.length > 0 ? localMappedData : mappedData;
  };

  const getRequiredMappedCount = () => {
    const requiredSchemas = schemas.filter((schema) => schema.required);
    const mappedRequired = requiredSchemas.filter((schema) =>
      mappings.some(
        (mapping) => mapping.schemaId === schema.id && mapping.mapped
      )
    );
    return { mapped: mappedRequired.length, total: requiredSchemas.length };
  };

  // Get columns that are already mapped to other parameters
  const getUsedColumns = (currentSchemaId: string) => {
    return mappings
      .filter(mapping => mapping.schemaId !== currentSchemaId && mapping.mapped && mapping.csvColumn)
      .map(mapping => mapping.csvColumn);
  };

  // Check if a column is available for selection
  const isColumnAvailable = (column: string, currentSchemaId: string) => {
    const usedColumns = getUsedColumns(currentSchemaId);
    return !usedColumns.includes(column);
  };

  // Generate preview data when modal opens
  useEffect(() => {
    if (open && csvData && mappings.length > 0) {
      const mappedColumns = mappings
        .filter((mapping) => mapping.mapped)
        .map((mapping) => ({
          ...mapping,
          schema: schemas.find((schema) => schema.id === mapping.schemaId),
        }))
        .filter((item) => item.schema);

      if (mappedColumns.length > 0) {
        const sampleData = csvData.rows.slice(0, 10).map((row) => {
          const mappedRow: MappedData = {};
          mappedColumns.forEach((column) => {
            const csvIndex = csvData.headers.indexOf(column.csvColumn);
            if (csvIndex !== -1) {
              const value = row[csvIndex];
              let convertedValue: string | number | boolean | Date | null =
                value;

              // Convert based on data type
              if (column.schema?.dataType === "number") {
                const parsed = parseFloat(value);
                convertedValue = isNaN(parsed) ? 0 : parsed;
                // Debug log for number conversion issues
                if (value && isNaN(parsed)) {
                  console.warn(`Failed to parse number: "${value}" for column ${column.csvColumn}`);
                }
              } else if (column.schema?.dataType === "boolean") {
                convertedValue =
                  value.toLowerCase() === "true" || value === "1";
              } else if (column.schema?.dataType === "date") {
                convertedValue = new Date(value);
              }

              mappedRow[column.schemaId] = convertedValue;
            }
          });
          return mappedRow;
        });

        setLocalMappedData(sampleData);
      }
    }
  }, [open, csvData, mappings, schemas]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: "#FFFFFF",
          color: "#222831",
          border: "1px solid #E0E0E0",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          pb: 2,
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", color: "primary.dark", fontSize: "2.4rem" }}
        >
          Parámetros de Detección
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            color: "secondary.light",
            ml: "auto",
            "&:hover": { backgroundColor: "#F5F5F5" },
          }}
        >
          <CloseIcon sx={{ fontSize: "2.5rem" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            my: 3,
          }}
        >
          Selecciona las columnas CSV para cada parámetro.
        </Typography>

        {/* Required Fields Counter */}
        {(() => {
          const { mapped, total } = getRequiredMappedCount();
          return (
            <Box
              sx={{
                mb: 3,
                p: 1,
                backgroundColor: mapped === total ? "#E8F5E8" : "#FFF3E0",
                borderRadius: 2,
                border: `1px solid ${mapped === total ? "#4CAF50" : "#FF9800"}`,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: mapped === total ? "#2E7D32" : "#F57C00",
                  fontWeight: "bold",
                }}
              >
                Campos Requeridos: {mapped} de {total} mapeados
              </Typography>
            </Box>
          );
        })()}

        {/* Interactive Table with Selects */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `5rem repeat(${schemas.length}, 1fr)`,
            backgroundColor: "grey.100",
            borderRadius: "1rem 1rem 0 0",
            border: "1px solid",
            borderColor: "grey.300",
          }}
        >
          <Typography
            variant="subtitle2"
            component="p"
            sx={{
              fontWeight: "bold",
              alignSelf: "center",
              justifySelf: "center",
            }}
          >
            #
          </Typography>

          {schemas.map((schema, idx) => {
            const mapping = mappings.find((m) => m.schemaId === schema.id);
            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  borderLeft: idx === 0 ? "1px solid" : "none",
                  borderRight: "1px solid",
                  "&:last-child": { borderRight: "none" },
                  borderColor: "grey.300",
                }}
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    {schema.label}
                  </Typography>

                  <Tooltip
                    title={
                      <Box sx={{ p: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          {schema.label}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {schema.description}
                        </Typography>
                        {schema.example && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#E0E0E0",
                              fontStyle: "italic",
                            }}
                          >
                            Ejemplo: {schema.example}
                          </Typography>
                        )}
                        {mapping?.csvColumn && (
                          <Box sx={{ mt: 1 }}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#4CAF50",
                                fontWeight: "bold",
                              }}
                            >
                              ✓ Mapeado a: {mapping.csvColumn}
                            </Typography>
                          </Box>
                        )}
                        {(() => {
                          const usedColumns = getUsedColumns(schema.id);
                          if (usedColumns.length > 0) {
                            return (
                              <Box sx={{ mt: 1 }}>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "#FF9800",
                                    fontWeight: "bold",
                                    display: "block",
                                    mb: 0.5
                                  }}
                                >
                                  Columnas en uso por otros parámetros:
                                </Typography>
                                {usedColumns.map((column, idx) => (
                                  <Typography
                                    key={idx}
                                    variant="caption"
                                    sx={{
                                      color: "#F57C00",
                                      display: "block",
                                      ml: 1
                                    }}
                                  >
                                    • {column}
                                  </Typography>
                                ))}
                              </Box>
                            );
                          }
                          return null;
                        })()}
                      </Box>
                    }
                    arrow
                    placement="top"
                  >
                    <IconButton
                      size="medium"
                      sx={{
                        color: "#7087ea",
                        "&:hover": {
                          backgroundColor: "rgba(112, 135, 234, 0.1)",
                        },
                      }}
                    >
                      <InfoOutlinedIcon sx={{ fontSize: "2rem" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <FormControl fullWidth size="small">
                  <Select
                    value={mapping?.csvColumn || ""}
                    onChange={(e) => onMappingChange(schema.id, e.target.value)}
                    displayEmpty
                    sx={{
                      fontSize: "1rem",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E0E0E0",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "secondary.main",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "secondary.main",
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: "common.white",
                          "& .MuiMenuItem-root": {
                            fontSize: "1.2rem",
                            padding: "8px 16px",
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
                    <MenuItem value="">
                      <Typography variant="caption">
                        Seleccionar columna
                      </Typography>
                    </MenuItem>
                    {csvData?.headers.map((column) => {
                      const isAvailable = isColumnAvailable(column, schema.id);
                      const isCurrentlySelected = mapping?.csvColumn === column;
                      
                      return (
                        <MenuItem 
                          key={column} 
                          value={column}
                          disabled={!isAvailable && !isCurrentlySelected}
                          sx={{
                            opacity: isAvailable || isCurrentlySelected ? 1 : 0.5,
                            '&.Mui-disabled': {
                              color: '#999',
                              fontStyle: 'italic'
                            }
                          }}
                        >
                          <Typography sx={{ fontSize: "1.2rem" }}>
                            {column}
                            {!isAvailable && !isCurrentlySelected && (
                              <Typography 
                                component="span" 
                                sx={{ 
                                  fontSize: "1rem", 
                                  color: "#999", 
                                  ml: 1,
                                  fontStyle: "italic"
                                }}
                              >
                                (ya en uso)
                              </Typography>
                            )}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {(() => {
                  const availableColumns = csvData?.headers.filter(column => 
                    isColumnAvailable(column, schema.id)
                  ).length || 0;
                  const totalColumns = csvData?.headers.length || 0;
                  
                  if (totalColumns > 0) {
                    return (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: availableColumns > 0 ? "#4CAF50" : "#F57C00",
                          fontSize: "0.75rem",
                          mt: 0.5,
                          display: "block"
                        }}
                      >
                        {availableColumns} de {totalColumns} columnas disponibles
                      </Typography>
                    );
                  }
                  return null;
                })()}
              </Box>
            );
          })}
        </Box>
        {csvData?.rows.slice(0, 10).map((row, idx) => {
          const previewData = getPreviewData();
          const mappedRow = previewData[idx] || {};
          
          return (
            <Box
              key={idx}
              sx={{
                backgroundColor: idx % 2 !== 0 ? "grey.100" : "common.white",
                border: "1px solid",
                borderTop: "none",
                borderColor: "grey.300",
                justifyItems: "center",
                alignItems: "center",
                display: "grid",
                gridTemplateColumns: `5rem repeat(${schemas.length}, 1fr)`,
                borderRadius:
                  idx === schemas.length - 1 ? "0 0 1rem 1rem" : "0",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "medium", color: "primary.dark" }}
              >
                {idx + 1}
              </Typography>

              {schemas.map((schema, index) => {
                const mapping = mappings.find((m) => m.schemaId === schema.id);
                const value = mapping?.csvColumn ? mappedRow[schema.id] : null;
                return (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: "primary.dark",
                      padding: 2, 
                      "&:nth-child(even)": {
                        borderRight: "1px solid",
                        borderLeft: "1px solid",
                        borderColor: "grey.300"
                      },
                      width: "100%",
                      
                    }}
                  >
                    {mapping?.csvColumn && value !== null && value !== undefined
                      ? String(formatValue(value, schema.dataType))
                      : "-"}
                  </Typography>
                );
              })}
            </Box>
          );
        })}
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          pt: 2,
          borderTop: "1px solid #E0E0E0",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "#393E46",
            borderColor: "#E0E0E0",
            "&:hover": {
              borderColor: "#00BFFF",
              backgroundColor: "#F5F5F5",
            },
          }}
          variant="outlined"
        >
          Cancelar
        </Button>

        <Button
          onClick={handleConfirm}
          disabled={!isComplete}
          color="secondary"
          variant="contained"
        >
          Confirmar Mapeo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
