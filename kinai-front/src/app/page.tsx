import { Header } from "@/components/home/Header";
import { Box, Typography } from "@mui/material";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { InfoCard } from "@/components/home/InfoCard";
import { ExoplanetsSection } from "@/components/home/ExoplanetsSection";
import { LightCurveSection } from "@/components/home/LightCurveSection";
import { DataChallengeSection } from "@/components/home/DataChallengeSection";
import { ComparisonSection } from "@/components/home/ComparisonSection";
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
          padding: "6rem 4rem 2rem 4rem",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          mx: "auto",
          minHeight: "80vh",
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          sx={{ textAlign: "center", color: "primary.dark" }}
        >
          What is an exoplanet and why is it important?
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
          An exoplanet is a planet that orbits a star outside our solar system. Identifying them is crucial to understanding the formation of planetary systems, searching for atmospheres that could harbor life, and ultimately answering the question of whether we are alone in the universe.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          <InfoCard
            title="Search for Life"
            description='Finding planets in the "habitable zone", where liquid water could exist, is the first step in searching for life beyond Earth.'
            icon={
              <PublicRoundedIcon
                sx={{ fontSize: "2.5rem", color: "secondary.dark" }}
              />
            }
          />
          <InfoCard
            title="Understanding the Universe"
            description="The study of exoplanets reveals the diversity of worlds that exist and helps us better understand how planets form and evolve."
            icon={<LightbulbOutlinedIcon sx={{ fontSize: "2.5rem", color: "secondary.dark" }} />}
          />
          <InfoCard
            title="Future Inspiration"
            description="Every discovered exoplanet inspires new generations to explore, investigate, and dream about the infinite possibilities of the cosmos."
            icon={<AutoAwesomeOutlinedIcon sx={{ fontSize: "2.5rem", color: "secondary.dark" }} />}
          />
        </Box>
      </Box>

      <LightCurveSection />

      <ExoplanetsSection exoplanets={sampleExoplanets} />
      
      <DataChallengeSection />


      <ComparisonSection />

    </>
  );
}
