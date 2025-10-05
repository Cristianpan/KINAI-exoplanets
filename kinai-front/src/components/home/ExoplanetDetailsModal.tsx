"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import { Exoplanet } from "@/interfaces/exoplanet";
import { LightCurveChart } from "./LightCurveChart";

interface ExoplanetDetailsModalProps {
  open: boolean;
  onClose: () => void;
  exoplanet: Exoplanet | null;
}

export const ExoplanetDetailsModal: React.FC<ExoplanetDetailsModalProps> = ({
  open,
  onClose,
  exoplanet,
}) => {
  if (!exoplanet) return null;

  const dataCards = [
    {
      icon: <HourglassEmptyRoundedIcon sx={{ fontSize: "2.5rem", color: "#7087ea" }} />,
      title: "Periodo Orbital",
      value: `${exoplanet.orbitalPeriod} días`,
    },
    {
      icon: <SquareFootOutlinedIcon sx={{ fontSize: "2.5rem", color: "#00BFFF" }} />,
      title: "Radio",
      value: `${exoplanet.radius} R⊕`,
    },
    {
      icon: <DeviceThermostatOutlinedIcon sx={{ fontSize: "2.5rem", color: "#00CED1" }} />,
      title: "Temperatura",
      value: `${exoplanet.temperature} K`,
    },
    {
      icon: exoplanet.isVerified ? (
        <CheckCircleOutlinedIcon sx={{ fontSize: "2.5rem", color: "#4CAF50" }} />
      ) : (
        <PublicRoundedIcon sx={{ fontSize: "2.5rem", color: "#FF9800" }} />
      ),
      title: "Habitabilidad",
      value: exoplanet.habitability || (exoplanet.isVerified ? "Potencialmente Habitable" : "No Verificado"),
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: "white",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          borderBottom: "1px solid rgba(140, 156, 228, 0.2)",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: "primary.dark",
            fontSize: "2.4rem",
          }}
        >
          {exoplanet.name}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: "secondary.light",
            "&:hover": {
              backgroundColor: "rgba(112, 135, 234, 0.1)",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: "2.5rem" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: 3 }}>
        {/* Light Curve Section */}
        <Box sx={{ marginBottom: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2, marginTop: "2rem" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#0D1B2A",
                fontSize: "2rem",
              }}
            >
              Curva de Luz del Tránsito
            </Typography>
            <Tooltip
              title="La curva de luz muestra la disminución en el brillo de una estrella cuando un exoplaneta pasa frente a ella. Esta técnica permite detectar exoplanetas midiendo las variaciones periódicas en la luminosidad estelar, revelando información sobre el tamaño, período orbital y otros parámetros del planeta."
              arrow
              placement="top"
              componentsProps={{
                tooltip: {
                  sx: {
                    fontSize: "1.4rem",
                    maxWidth: "400px",
                    padding: "12px 16px",
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  },
                },
                arrow: {
                  sx: {
                    color: "rgba(0, 0, 0, 0.9)",
                  },
                },
              }}
            >
              <IconButton 
                size="medium" 
                sx={{ 
                  color: "#7087ea",
                  "&:hover": {
                    backgroundColor: "rgba(112, 135, 234, 0.1)",
                  },
                }}
              >
                <InfoOutlinedIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
            </Tooltip>
          </Box>
          
          <LightCurveChart
            points={exoplanet.points}
          />
        </Box>

        {/* Exoplanet Data Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#0D1B2A",
              fontSize: "2rem",
              marginBottom: 2,
            }}
          >
            Datos del Exoplaneta
          </Typography>
          
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 2,
            }}
          >
            {dataCards.map((card, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                  border: "1px solid rgba(140, 156, 228, 0.3)",
                  borderRadius: 2,
                  backgroundColor: "white",
                  height: "100%",
                  minHeight: "120px",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ marginBottom: 1 }}>
                  {card.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontSize: "1.2rem",
                    textAlign: "center",
                    marginBottom: 0.5,
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#0D1B2A",
                    fontSize: "1.6rem",
                    textAlign: "center",
                  }}
                >
                  {card.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
