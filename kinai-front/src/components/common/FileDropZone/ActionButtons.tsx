import { Button, CircularProgress } from "@mui/material";
import { AutoFixHigh } from "@mui/icons-material";
interface ActionButtonsProps {
  hasFiles: boolean;
  isLoading?: boolean;
  onAnalyzeWithAI?: () => void;
  onUseExampleData?: () => void;
}

export default function ActionButtons({
  hasFiles,
  isLoading = false,
  onAnalyzeWithAI,
}: ActionButtonsProps) {
  return (
    <>
      {onAnalyzeWithAI && (
        <Button
          onClick={onAnalyzeWithAI}
          disabled={!hasFiles || isLoading}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <AutoFixHigh />}
          color="secondary"
          variant="contained"
          size="large"
          sx={{
            fontSize: "1.6rem",
            p: "1rem 2rem"
          }}
        >
          {isLoading ? "Procesando..." : "Analyze with AI"}
        </Button>
      )}
    </>
  );
}
