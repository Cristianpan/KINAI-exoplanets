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
      <Typography
        variant="body2"
        component="p"
        sx={{ mt: 2, mb: 1, fontWeight: 600, color: "secondary.main" }}
      >
        Selected files ({files.length}/{maxFiles}):
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
              },
              ...(removingIndex === index && {
                transform: "translateX(100%)",
                opacity: 0,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }),
              ...(newFileIndex === index && {
                transform: "translateY(-10px)",
                opacity: 0,
                animation:
                  "slideInFromTop 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
              }),
            }}
          >
            <Description color="secondary" fontSize="large" />
            <Typography variant="body2" sx={{ flex: 1 }}>
              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </Typography>

            {/* Edit button - only show if file is processed */}
            {onEditFile && processedFiles[index] && (
              <Button
                size="large"
                variant="outlined"
                color="secondary"
                onClick={() => onEditFile(index)}
                sx={{
                  minWidth: "auto",
                  p: 0.5,

                  transition: "all 0.2s ease",
                  transform: "scale(1)",
                }}
              >
                <Edit fontSize="large" />
              </Button>
            )}

            {/* Remove button */}
            <Button
              size="large"
              variant="outlined"
              color="error"
              onClick={() => onRemoveFile(index)}
              sx={{
                minWidth: "auto",
                p: 0.5,

                transition: "all 0.2s ease",
                transform: "scale(1)",
              }}
            >
              <Close fontSize="large" />
            </Button>
          </Box>
        </Fade>
      ))}
    </Collapse>
  );
}
