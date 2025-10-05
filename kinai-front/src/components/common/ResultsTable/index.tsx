import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material";
import React from "react";
import { ResultsTableProps } from "../../../interfaces/dataset";

export const ResultsTable: React.FC<ResultsTableProps> = ({
  datasets,
  onViewDataset,
}) => {

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "ready":
        return {
          label: "Ready",
          color: "primary.dark",
          backgroundColor: "#8ed091",
          icon: (
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#8ed091",
                marginRight: 1,
              }}
            />
          ),
        };
      case "processing":
        return {
          label: "Processing",
          color: "primary.dark",
          backgroundColor: "#e9a239",
          icon: (
            <CircularProgress
              size={12}
              sx={{
                color: "primary.dark",
                marginRight: 1,
                "& .MuiCircularProgress-circle": {
                  strokeWidth: 2,
                },
              }}
            />
          ),
        };
      case "error":
        return {
          label: "Error",
          color: "primary.dark",
          backgroundColor: "#f18b83",
          icon: (
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#f18b83",
                marginRight: 1,
              }}
            />
          ),
        };
      default:
        return {
          label: "Pending",
          color: "#9E9E9E",
          backgroundColor: "#9E9E9E",
          icon: (
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#9E9E9E",
                marginRight: 1,
              }}
            />
          ),
        };
    }
  };

  if (datasets.length === 0) {
    return null;
  }

  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: 500, fontSize: "2.4rem", mt: "3rem" }}>Results</Typography>
      <Box
        sx={{
          width: "100%",
          borderRadius: 2,
          border: `1px solid`,
          borderColor: "grey.300",
          mt: "2rem",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            alignItems: "center",
            backgroundColor: "grey.200",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              borderRight: `1px solid`,
              borderColor: "grey.300",
              padding: "1rem",
              fontWeight: 500,
            }}
          >
            Name
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              borderRight: `1px solid`,
              borderColor: "grey.300",
              padding: "1rem",
              fontWeight: 500,
            }}
          >
            Status
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              borderRight: `1px solid`,
              borderColor: "grey.300",
              padding: "1rem",
              fontWeight: 500,
            }}
          >
            Uploaded At
          </Typography>
          <Typography variant="subtitle2" sx={{ padding: "1rem" }}>
            Actions
          </Typography>
        </Box>

        {/* Table Rows */}
        {datasets.map((dataset, idx) => {
          const statusConfig = getStatusConfig(dataset.status);

          return (
            <Box
              key={dataset.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                alignItems: "center",
                borderTop: `1px solid`,
                borderColor: "grey.300",
                backgroundColor: idx % 2 === 0 ? "common.white" : "grey.50",
              }}
            >
              {/* Dataset Name */}
              <Typography
                variant="body2"
                sx={{
                  padding: "1rem",
                  borderRight: `1px solid`,
                  borderColor: "grey.300",
                }}
              >
                {dataset.name}
              </Typography>

              {/* Status */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem",
                  borderRight: `1px solid`,
                  borderColor: "grey.300",
                }}
              >
                <Chip
                  label={statusConfig.label}
                  size="small"
                  sx={{
                    backgroundColor: statusConfig.backgroundColor,
                    color: "white",
                    fontSize: "1.2rem",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                />
              </Box>

              {/* Uploaded At */}
              <Typography
                variant="body2"
                sx={{
                  padding: "1rem",
                  borderRight: `1px solid`,
                  borderColor: "grey.300",
                }}
              >
                {dataset.uploadedAt}
              </Typography>

              {/* Actions */}
              <Button
                onClick={() => onViewDataset(dataset.id)}
                sx={{
                  color: "secondary.main",
                  fontWeight: 500,
                  textTransform: "none",
                  padding: 0,
                  width: "fit-content",
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                View
              </Button>
            </Box>
          );
        })}
      </Box>
    </>
  );
};
