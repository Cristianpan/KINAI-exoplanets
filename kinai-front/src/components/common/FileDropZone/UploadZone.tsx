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
        borderColor: isDragOver ? "secondary.light" : "grey.400",
        borderRadius: 2,
        p: 4,
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        backgroundColor: isDragOver ? "grey.50" : "common.white",
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
      }} />
      
      <Typography variant="body2" sx={{
        color: "grey.600",
        mb: 1,
      }}>
        Haz clic para cargar o arrastra archivos aquí
      </Typography>
      
      <Typography variant="caption" sx={{
        color: "grey.500",
      }}>
        Formatos soportados: {acceptedTypes.join(", ").toUpperCase()} (máx. {maxFileSize}MB por archivo, {maxFiles} archivos máximo)
      </Typography>
    </Paper>
  );
}
