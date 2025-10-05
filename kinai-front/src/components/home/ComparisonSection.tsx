"use client";
import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export const ComparisonSection: React.FC = () => {
  return (
      <Box
        component="section"
        id="comparison"
      sx={{
        maxWidth: "1024px",
        padding: "4rem 4rem 2rem 4rem",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
        mx: "auto",
        minHeight: "80vh",
      }}
    >
      <Typography
        component="h2"
        variant="h2"
        sx={{ textAlign: "center", color: "primary.dark", mb: 2 }}
      >
        Manual Analysis vs. Artificial Intelligence
      </Typography>
      
      <Typography
        component="p"
        variant="body1"
        sx={{
          textAlign: "center",
          color: "secondary.dark",
          mb: "4rem",
          fontWeight: 400,
          maxWidth: "800px",
        }}
      >
        AI does not replace astronomers, but exponentially amplifies their capabilities.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 4,
          mb: 4,
          width: "100%",
        }}
      >
        {/* Manual Analysis Card */}
        <Box>
          <Card
            sx={{
              height: "100%",
              backgroundColor: "#f5f5f5",
              borderRadius: 3,
              border: "none",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <PersonIcon sx={{ fontSize: "2.5rem", color: "#666", mr: 2 }} />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: "primary.dark",
                    fontSize: "2.4rem",
                  }}
                >
                  Manual Analysis
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AccessTimeIcon sx={{ fontSize: "2rem", color: "#666", mr: 2 }} />
                  <Typography variant="body1" sx={{ color: "primary.dark", fontSize: "1.6rem" }}>
                    <strong>Analysis Time:</strong> Weeks or months to analyze thousands of light curves
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <GpsFixedIcon sx={{ fontSize: "2rem", color: "#666", mr: 2 }} />
                  <Typography variant="body1" sx={{ color: "primary.dark", fontSize: "1.6rem" }}>
                    <strong>Accuracy:</strong> Limited by human fatigue and cognitive biases
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TrendingUpIcon sx={{ fontSize: "2rem", color: "#666", mr: 2 }} />
                  <Typography variant="body1" sx={{ color: "primary.dark", fontSize: "1.6rem" }}>
                    <strong>Scalability:</strong> Requires large teams to process massive data
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: "rgba(102, 102, 102, 0.1)",
                  borderRadius: 2,
                  padding: 3,
                  textAlign: "center",
                  mt: 3,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: "primary.dark",
                    fontSize: "3.2rem",
                    mb: 1,
                  }}
                >
                  ~100
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "primary.dark",
                    fontSize: "1.4rem",
                    fontWeight: 500,
                  }}
                >
                  Light curves per day
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* AI Analysis Card */}
        <Box>
          <Card
            sx={{
              height: "100%",
              backgroundColor: "rgba(112, 135, 234, 0.1)",
              borderRadius: 3,
              border: "none",
              boxShadow: "0 4px 16px rgba(112, 135, 234, 0.2)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <PsychologyIcon sx={{ fontSize: "2.5rem", color: "secondary.main", mr: 2 }} />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: "primary.dark",
                    fontSize: "2.4rem",
                  }}
                >
                  AI Analysis
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <AccessTimeIcon sx={{ fontSize: "2rem", color: "secondary.main", mr: 2 }} />
                    <Typography variant="body1" sx={{ color: "primary.dark", fontSize: "1.6rem" }}>
                      <strong>Analysis Time:</strong> Minutes to analyze millions of light curves
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "secondary.main", fontSize: "1.4rem", ml: 6, fontWeight: 600 }}>
                    1000x faster
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <GpsFixedIcon sx={{ fontSize: "2rem", color: "secondary.main", mr: 2 }} />
                    <Typography variant="body1" sx={{ color: "primary.dark", fontSize: "1.6rem" }}>
                      <strong>Accuracy:</strong> Detects subtle patterns invisible to the human eye
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "secondary.main", fontSize: "1.4rem", ml: 6, fontWeight: 600 }}>
                    99.8% accuracy
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <TrendingUpIcon sx={{ fontSize: "2rem", color: "secondary.main", mr: 2 }} />
                    <Typography variant="body1" sx={{ color: "primary.dark", fontSize: "1.6rem" }}>
                      <strong>Scalability:</strong> Processes data from multiple missions simultaneously
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "secondary.main", fontSize: "1.4rem", ml: 6, fontWeight: 600 }}>
                    Unlimited scaling
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: "rgba(112, 135, 234, 0.2)",
                  borderRadius: 2,
                  padding: 3,
                  textAlign: "center",
                  mt: 3,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: "primary.dark",
                    fontSize: "3.2rem",
                    mb: 1,
                  }}
                >
                  1M+
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "primary.dark",
                    fontSize: "1.4rem",
                    fontWeight: 500,
                  }}
                >
                  Light curves per day
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
