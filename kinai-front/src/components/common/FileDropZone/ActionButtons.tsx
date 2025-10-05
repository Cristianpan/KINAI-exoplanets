import { Button } from "@mui/material";
import { AutoFixHigh, ConstructionOutlined } from "@mui/icons-material";
import { CSVData } from "@/interfaces/columnMapping";

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
    <>
      {onAnalyzeWithAI && (
        <Button
          onClick={onAnalyzeWithAI}
          disabled={!hasFiles}
          startIcon={<AutoFixHigh />}
          color="secondary"
          variant="contained"
          size="large"
          sx={{
            fontSize: "1.6rem",
            p: "1rem 2rem"
          }}
        >
          Analyze with AI
        </Button>
      )}
    </>
  );
}
