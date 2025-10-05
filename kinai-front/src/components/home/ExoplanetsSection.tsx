"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ExoplanetCard } from "./ExoplanetCard";
import { ExoplanetDetailsModal } from "./ExoplanetDetailsModal";
import { Exoplanet } from "@/interfaces/exoplanet";

interface ExoplanetsSectionProps {
  exoplanets: Exoplanet[];
}

export const ExoplanetsSection: React.FC<ExoplanetsSectionProps> = ({ exoplanets }) => {
  const [selectedExoplanet, setSelectedExoplanet] = useState<Exoplanet | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleExoplanetClick = (exoplanet: Exoplanet) => {
    setSelectedExoplanet(exoplanet);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedExoplanet(null);
  };

  return (
    <>
      <Box
        component="section"
        id="exoplanets"
        sx={{
          padding: "2rem 4rem",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          mx: "auto",
          maxWidth: "1024px",
          minHeight: "80vh",
        }}
      >
        <Typography
          component="h2"
          variant="h2"
          sx={{ textAlign: "center", color: "primary.dark"}}
        >
          Discovered Exoplanets
        </Typography>
        <Typography
          component="p"
          variant="body1"
          sx={{
            textAlign: "center",
            color: "secondary.dark",
            fontWeight: 400,
            mb: 3,
          }}
        >
          Explore some of the most fascinating exoplanets we have discovered so far. Each one represents a unique world with extraordinary characteristics.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 4,
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {exoplanets.map((exoplanet) => (
            <ExoplanetCard 
              key={exoplanet.id} 
              exoplanet={exoplanet} 
              onClick={handleExoplanetClick}
            />
          ))}
        </Box>
      </Box>

      <ExoplanetDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        exoplanet={selectedExoplanet}
      />
    </>
  );
};
