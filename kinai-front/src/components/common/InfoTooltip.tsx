"use client";
import { useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface InfoTooltipProps {
  title: string;
  description: string;
  placement?: "top" | "bottom" | "left" | "right";
}

export default function InfoTooltip({ 
  title, 
  description, 
  placement = "top" 
}: InfoTooltipProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Tooltip
      title={
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2">
            {description}
          </Typography>
        </Box>
      }
      placement={placement}
      open={open}
      onClose={handleClose}
      arrow
      PopperProps={{
        disablePortal: false,
        style: { zIndex: 9999 },
      }}
    >
      <IconButton
        size="small"
        onClick={handleClick}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        sx={{
          color: "primary.main",
          "&:hover": {
            backgroundColor: "primary.light",
            color: "white",
          },
        }}
      >
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
