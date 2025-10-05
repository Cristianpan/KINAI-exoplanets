"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import TimelineIcon from "@mui/icons-material/Timeline";
import ScienceIcon from "@mui/icons-material/Science";
import { InfoCard } from "@/components/home/InfoCard";

export const DataChallengeSection: React.FC = () => {
  return (
      <Box
        component="section"
        id="data-challenge"
      sx={{
        maxWidth: "1024px",
        padding: "2rem 4rem",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
        mx: "auto",
        minHeight: "80vh",
      }}
    >
      <Typography
        component="h2"
        variant="h2"
        sx={{ textAlign: "center", color: "primary.dark" }}
      >
        El Desafío de los Datos Astronómicos
      </Typography>
      
      <Typography
        component="p"
        variant="body1"
        sx={{
          textAlign: "center",
          color: "secondary.dark",
          mb: "3rem",
          fontWeight: 400,
          maxWidth: "800px",
        }}
      >
        La misión Kepler de la NASA observó más de 150,000 estrellas generando 
        más de 10 terabytes de datos. El análisis manual de estas curvas de luz 
        requiere examinar millones de puntos de datos por cada exoplaneta candidato.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          width: "100%",
        }}
      >
        <InfoCard
          title="10+ Terabytes de Datos"
          description="Kepler recopiló información de 150,000 estrellas durante 9 años de observación continua"
          icon={
            <StorageIcon
              sx={{ fontSize: "2.5rem", color: "secondary.dark" }}
            />
          }
        />
        <InfoCard
          title="Millones de Puntos por Curva"
          description="Cada curva de luz contiene cientos de miles de mediciones de brillo estelar que deben analizarse individualmente"
          icon={<TimelineIcon sx={{ fontSize: "2.5rem", color: "secondary.dark" }} />}
        />
        <InfoCard
          title="Análisis Manual Intensivo"
          description="El proceso de confirmación de un exoplaneta puede requerir semanas o meses de revisión experta por cada candidato"
          icon={<ScienceIcon sx={{ fontSize: "2.5rem", color: "secondary.dark" }} />}
        />
      </Box>
    </Box>
  );
};
