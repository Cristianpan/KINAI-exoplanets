"use client";
import { Box, Button } from "@mui/material";
import { AutoFixHigh, Description } from "@mui/icons-material";

interface ActionButtonsProps {
  hasFiles: boolean;
  onAnalyzeWithAI?: () => void;
  onUseExampleData?: () => void;
}

export default function ActionButtons({
  hasFiles,
  onAnalyzeWithAI,
  onUseExampleData,
}: ActionButtonsProps) {
  return (
    <Box sx={{
      display: "flex",
      gap: 2,
      mt: 3,
      justifyContent: "center",
      flexWrap: "wrap",
    }}>
      {onAnalyzeWithAI && (
        <Button
          onClick={onAnalyzeWithAI}
          disabled={!hasFiles}
          startIcon={<AutoFixHigh />}
          sx={{
            backgroundColor: "secondary.main",
            color: "white",
            px: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "secondary.dark",
            },
          }}
        >
          Analizar con IA
        </Button>
      )}
      
      {onUseExampleData && (
        <Button
          onClick={onUseExampleData}
          startIcon={<Description />}
          sx={{
            color: "primary.dark",
            px: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            border: "1px solid",
            borderColor: "grey.300",
            "&:hover": {
              backgroundColor: "grey.50",
            },
          }}
        >
          Usar datos de ejemplo
        </Button>
      )}
    </Box>
  );
}
