import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
        backgroundImage: "url('/assets/images/head-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box sx={{ maxWidth: "50%" }}>
        <Typography
          component="h1"
          sx={{
            fontSize: "5rem",
            fontWeight: 600,
            color: "common.white",
            textAlign: "center",
          }}
        >
          Descubriendo nuevos mundos entre millones de estrellas
        </Typography>
        <Typography
          component="p"
          sx={{
            fontSize: "2rem",
            fontWeight: 400,
            color: "common.white",
            textAlign: "center",
          }}
        >
          Cada punto de luz en el cielo esconde una historia. Algunos de ellos,
          quizá, otro planeta como la Tierra.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: "3rem", width: "20rem", fontWeight: 600 }}
          component={Link}
          href="#learn-more"
        >
          Aprende más
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: "3rem",
            width: "20rem",
            fontWeight: 600,
            py: 1.2,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(20px)",
            color: "common.white",
            transition: "color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              color: "grey.900",
            },
          }}
          component={Link}
          href="#"
        >
          Comenzar análisis
        </Button>
      </Box>
    </Box>
  );
};
