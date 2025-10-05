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
        The Challenge of Astronomical Data
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
        NASA's Kepler mission observed more than 150,000 stars, generating over 10 terabytes of data. Manual analysis of these light curves requires examining millions of data points for each exoplanet candidate.
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
          title="10+ Terabytes of Data"
          description="Kepler collected information from 150,000 stars during 9 years of continuous observation."
          icon={
            <StorageIcon
              sx={{ fontSize: "2.5rem", color: "secondary.dark" }}
            />
          }
        />
        <InfoCard
          title="Millions of Points per Curve"
          description="Each light curve contains hundreds of thousands of stellar brightness measurements that must be analyzed individually."
          icon={<TimelineIcon sx={{ fontSize: "2.5rem", color: "secondary.dark" }} />}
        />
        <InfoCard
          title="Intensive Manual Analysis"
          description="The process of confirming an exoplanet can require weeks or months of expert review for each candidate."
          icon={<ScienceIcon sx={{ fontSize: "2.5rem", color: "secondary.dark" }} />}
        />
      </Box>
    </Box>
  );
};
