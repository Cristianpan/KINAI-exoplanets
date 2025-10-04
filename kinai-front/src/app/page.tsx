import { Header } from "@/components/home/Header";
import { Box, Typography } from "@mui/material";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { InfoCard } from "@/components/home/InfoCard";
import { ExoplanetsSection } from "@/components/home/ExoplanetsSection";
import { Exoplanet } from "@/interfaces/exoplanet";

export default function Home() {
  // Sample exoplanet data
  const sampleExoplanets: Exoplanet[] = [
    {
      id: "1",
      name: "Kepler-452b",
      type: "Super Earth",
      radius: 1.6,
      temperature: 265,
      orbitalPeriod: 384.8,
      isVerified: true,
      habitability: "Potencialmente Habitable",
      planetType: "Super Earth",
    },
    {
      id: "2",
      name: "Proxima Centauri b",
      type: "Terrestrial",
      radius: 1.1,
      temperature: 234,
      orbitalPeriod: 11.2,
      isVerified: false,
      habitability: "No Verificado",
      planetType: "Terrestrial",
    },
    {
      id: "3",
      name: "TRAPPIST-1e",
      type: "Terrestrial",
      radius: 0.92,
      temperature: 251,
      orbitalPeriod: 6.1,
      isVerified: true,
      habitability: "Potencialmente Habitable",
      planetType: "Terrestrial",
    },
  ];

  return (
    <>
      <Header />
      <Box
        component="main"
        id="learn-more"
        sx={{
          maxWidth: "1024px",
          padding: "8rem 4rem",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          mx: "auto",
          minHeight: "100vh",
          scrollSnapAlign: "start",
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          sx={{ textAlign: "center", color: "primary.dark" }}
        >
          ¿Qué es un exoplaneta y por qué es importante?
        </Typography>
        <Typography
          component="p"
          variant="body1"
          sx={{
            textAlign: "center",
            color: "secondary.dark",
            mb: "3rem",
            fontWeight: 400,
          }}
        >
          Un exoplaneta es un planeta que orbita una estrella fuera de nuestro
          sistema solar. Su identificación es crucial para entender la formación
          de sistemas planetarios, buscar atmósferas que puedan albergar vida y,
          en última instancia, responder a la pregunta de si estamos solos en el
          universo.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          <InfoCard
            title="Busqueda de vida"
            description='Encontrar planetas en la "zona habitable". donde podría existir agua líquida, es el primer paso para buscar vida más allá de la Tierra'
            icon={
              <PublicRoundedIcon
                sx={{ fontSize: "2.5rem", color: "secondary.dark" }}
              />
            }
          />
          <InfoCard
            title="Entender el universo"
            description="El estudio de exoplanetas nos revela la diversidad de mundos que existen y nos ayuda a comprender mejor cómo se forman y evolucionan los planetas"
            icon={<LightbulbOutlinedIcon sx={{ fontSize: "2.5rem", color: "secondary.dark" }} />}
          />
          <InfoCard
            title="Inspiración futura"
            description="Cada exoplaneta descubierto inspira a nuevas generaciones a explorar, investigar y soñar con las posibilidades infinitas del cosmos"
            icon={<AutoAwesomeOutlinedIcon sx={{ fontSize: "2.5rem", color: "secondary.dark" }} />}
          />
        </Box>
      </Box>

      <ExoplanetsSection exoplanets={sampleExoplanets} />
    </>
  );
}
