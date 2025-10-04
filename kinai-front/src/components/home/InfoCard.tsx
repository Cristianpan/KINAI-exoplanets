import { Box, Typography } from "@mui/material";
interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const InfoCard = ({ title, description, icon }: InfoCardProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: 3,
        backgroundColor: "common.white",
        backdropFilter: "blur(30px)",
        border: "1px solid",
        borderColor: "rgba(140, 156, 228, 0.5)",
        borderRadius: 2,
      }}
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
        {icon}
      </Box>
      <Typography
        component="p"
        variant="body1"
        sx={{ fontWeight: 500, color: "primary.dark" }}
      >
        {title}
      </Typography>
      <Typography
        component="p"
        variant="body2"
        sx={{ color: "secondary.dark" }}
      >
        {description}
      </Typography>
    </Box>
  );
};
