"use client";
import { Typography, Paper } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

interface UploadZoneProps {
  isDragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
  acceptedTypes: string[];
  maxFileSize: number;
  maxFiles: number;
}

export default function UploadZone({
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  acceptedTypes,
  maxFileSize,
  maxFiles,
}: UploadZoneProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `3px dashed`,
        borderColor: isDragOver ? "secondary.main" : "grey.400",
        borderRadius: 2,
        p: 4,
        textAlign: "center" as const,
        cursor: "pointer",
        transition: "all 0.3s ease",
        backgroundColor: isDragOver ? "grey.50" : "transparent",
        borderStyle: "dashed",
        "&:hover": {
          borderColor: "grey.500",
          backgroundColor: "grey.50",
          borderWidth: "3px",
        },
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
    >
      <CloudUpload sx={{
        fontSize: "4rem",
        color: "secondary.main",
        mb: 2,
      }} />
      
      <Typography sx={{
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "primary.dark",
        mb: 1,
      }}>
        Carga de datos
      </Typography>
      
      <Typography sx={{
        fontSize: "1rem",
        color: "grey.600",
        mb: 2,
      }}>
        Haz clic para cargar o arrastra archivos aquí
      </Typography>
      
      <Typography sx={{
        fontSize: "0.875rem",
        color: "grey.500",
        mb: 3,
      }}>
        Formatos soportados: {acceptedTypes.join(", ").toUpperCase()} (máx. {maxFileSize}MB por archivo, {maxFiles} archivos máximo)
      </Typography>
    </Paper>
  );
}
