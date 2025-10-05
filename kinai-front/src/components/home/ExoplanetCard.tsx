"use client";
import React from "react";

import { Exoplanet } from "@/interfaces/exoplanet";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

import PublicRoundedIcon from "@mui/icons-material/PublicRounded";

interface ExoplanetCardProps {
  exoplanet: Exoplanet;
  onClick?: (exoplanet: Exoplanet) => void;
}

export const ExoplanetCard: React.FC<ExoplanetCardProps> = ({ exoplanet, onClick }) => {
  return (
    <Button
      onClick={() => onClick?.(exoplanet)}
      disableRipple
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        border: "1px solid",
        borderColor: "rgba(140, 156, 228, 0.5)",
        borderRadius: 2,
        padding: 3,
        textAlign: "left",
        textTransform: "none",
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "rgba(140, 156, 228, 0.1)",
          borderColor: "rgba(140, 156, 228, 0.8)",
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(140, 156, 228, 0.3)",
        },
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}
      >
        <Box
          sx={{
            width: "5rem",
            height: "5rem",
            backgroundColor: "rgba(140, 156, 228, 0.2)",
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PublicRoundedIcon
            sx={{ fontSize: "2.5rem", color: "secondary.dark" }}
          />
        </Box>
        {exoplanet.isVerified && (
          <CheckCircleOutlinedIcon
            sx={{ color: "success.main", fontSize: "2.5rem" }}
          />
        )}
        {!exoplanet.isVerified && (
          <HighlightOffRoundedIcon
            sx={{ color: "grey.800", fontSize: "2.5rem" }}
          />
        )}
      </Box>

      <Typography
        sx={{ fontWeight: 500, color: "primary.dark" }}
        variant="body1"
      >
        {exoplanet.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SquareFootOutlinedIcon sx={{ fontSize: "1.6rem", color: "grey.700" }} />
          <Typography variant="body2" sx={{ color: "grey.700" }}>
            Radius
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 500, color: "grey.900" }}>
          {exoplanet.radius} R⊕
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <DeviceThermostatOutlinedIcon sx={{ fontSize: "1.6rem", color: "grey.700" }} />
          <Typography variant="body2" sx={{ color: "grey.700" }}>
            Temp
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 500, color: "grey.900" }}>
          {exoplanet.temperature} K
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <HourglassEmptyRoundedIcon sx={{ fontSize: "1.6rem", color: "grey.700" }} />
          <Typography variant="body2" sx={{ color: "grey.700" }}>
            Orbital Period
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 500, color: "grey.900" }}>
          {exoplanet.orbitalPeriod}
        </Typography>
      </Box>
    </Button>
  );
};
