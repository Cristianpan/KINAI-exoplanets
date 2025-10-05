"use client";
import { Box, Button } from "@mui/material";
import { AutoFixHigh } from "@mui/icons-material";

interface ActionButtonsProps {
  hasFiles: boolean;
  onAnalyzeWithAI?: () => void;
  onUseExampleData?: () => void;
}

export default function ActionButtons({
  hasFiles,
  onAnalyzeWithAI,
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
    </Box>
  );
}
