"use client";
import { Box, Typography, Button, Fade, Collapse } from "@mui/material";
import { Description, Close, Edit } from "@mui/icons-material";

interface FileListProps {
  files: File[];
  maxFiles: number;
  removingIndex: number | null;
  newFileIndex: number | null;
  onRemoveFile: (index: number) => void;
  onEditFile?: (index: number) => void;
  processedFiles?: boolean[];
}

export default function FileList({
  files,
  maxFiles,
  removingIndex,
  newFileIndex,
  onRemoveFile,
  onEditFile,
  processedFiles = [],
}: FileListProps) {
  return (
    <Collapse in={files.length > 0} timeout={400}>
      <Box sx={{
        mt: 3,
        p: 3,
        backgroundColor: "grey.50",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "grey.200",
      }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          Archivos seleccionados ({files.length}/{maxFiles}):
        </Typography>
        {files.map((file, index) => (
          <Fade 
            key={`${file.name}-${index}`} 
            in={removingIndex !== index} 
            timeout={300}
          >
            <Box 
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
                p: 1,
                backgroundColor: "white",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "grey.100",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: "translateY(0)",
                opacity: 1,
                "&:last-child": {
                  mb: 0,
                },
                "&:hover": {
                  backgroundColor: "grey.50",
                  borderColor: "grey.200",
                  transform: "translateY(-1px)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                },
                ...(removingIndex === index && {
                  transform: "translateX(100%)",
                  opacity: 0,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }),
                ...(newFileIndex === index && {
                  transform: "translateY(-10px)",
                  opacity: 0,
                  animation: "slideInFromTop 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                }),
              }}
            >
              <Description color="primary" />
              <Typography variant="body2" sx={{ flex: 1 }}>
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </Typography>
              
              {/* Edit button - only show if file is processed */}
              {onEditFile && processedFiles[index] && (
                <Button
                  size="small"
                  onClick={() => onEditFile(index)}
                  sx={{
                    minWidth: "auto",
                    p: 0.5,
                    color: "primary.main",
                    transition: "all 0.2s ease",
                    transform: "scale(1)",
                    "&:hover": {
                      backgroundColor: "primary.light",
                      color: "primary.dark",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Edit fontSize="small" />
                </Button>
              )}
              
              {/* Remove button */}
              <Button
                size="small"
                onClick={() => onRemoveFile(index)}
                sx={{
                  minWidth: "auto",
                  p: 0.5,
                  color: "error.main",
                  transition: "all 0.2s ease",
                  transform: "scale(1)",
                  "&:hover": {
                    backgroundColor: "error.light",
                    color: "error.dark",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <Close fontSize="small" />
              </Button>
            </Box>
          </Fade>
        ))}
      </Box>
    </Collapse>
  );
}
