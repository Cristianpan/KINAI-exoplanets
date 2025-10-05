"use client";
import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";

type AnalysisState = "idle" | "analyzing" | "completed";

// Custom dot component that changes color based on analysis state
const CustomDot = (props: { cx: number; cy: number; payload: { analyzed: boolean } }) => {
  const { cx, cy, payload } = props;
  
  if (!payload) return null;
  
  let fillColor = "#7087ea"; // Default analyzed color
  
  if (payload.analyzed === false) {
    fillColor = "#e0e0e0"; // Light gray for unanalyzed
  } else if (payload.analyzed === true) {
    fillColor = "#7087ea"; // secondary.light equivalent
  }
  
  return (
    <circle
      cx={cx}
      cy={cy}
      r={1.5}
      fill={fillColor}
      stroke={fillColor}
      strokeWidth={0.3}
    />
  );
};

// Generate sample transit light curve data
const generateLightCurveData = () => {
  const data = [];
  const transitStart = 35;
  const transitEnd = 45;
  
  for (let i = 0; i <= 200; i++) {
    const time = i * 0.5; // More granular time steps
    let brightness = 1.0;
    
    // Create transit dip with more pronounced decrease
    if (time >= transitStart && time <= transitEnd) {
      const transitProgress = (time - transitStart) / (transitEnd - transitStart);
      if (transitProgress <= 0.1) {
        // Transit ingress
        brightness = 1.0 - (transitProgress / 0.1) * 0.05;
      } else if (transitProgress >= 0.9) {
        // Transit egress
        brightness = 1.0 - ((1 - transitProgress) / 0.1) * 0.05;
      } else {
        // Full transit
        brightness = 1.0 - 0.05;
      }
    }
    
    // Add more realistic noise
    const noise = (Math.random() - 0.5) * 0.008; // Increased noise for more realistic scatter
    brightness += noise;
    
    data.push({
      time: time,
      brightness: brightness,
      analyzed: false, // Track if this point has been analyzed
    });
  }
  
  return data;
};

export const LightCurveSection: React.FC = () => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [showTransit, setShowTransit] = useState(false);
  const [visiblePoints, setVisiblePoints] = useState(0);
  const [data, setData] = useState(() => {
    const initialData = generateLightCurveData();
    // Mark all points as analyzed in idle state
    return initialData.map(point => ({ ...point, analyzed: true }));
  });

  const startAnalysis = () => {
    setAnalysisState("analyzing");
    setShowTransit(false);
    setVisiblePoints(0);
    
    // Reset all points to unanalyzed state
    setData(prevData => prevData.map(point => ({ ...point, analyzed: false })));
    
    // Animate points being analyzed progressively
    let currentPoint = 0;
    const totalPoints = data.length;
    const intervalTime = 3000 / totalPoints; // 3 seconds total
    
    const interval = setInterval(() => {
      currentPoint++;
      setVisiblePoints(currentPoint);
      
      // Mark points as analyzed progressively
      setData(prevData => 
        prevData.map((point, index) => 
          index < currentPoint ? { ...point, analyzed: true } : point
        )
      );
      
      if (currentPoint >= totalPoints) {
        clearInterval(interval);
        setAnalysisState("completed");
        setShowTransit(true);
      }
    }, intervalTime);
  };

  const resetAnalysis = () => {
    setAnalysisState("idle");
    setShowTransit(false);
    setVisiblePoints(0);
    const resetData = generateLightCurveData();
    // Mark all points as analyzed when resetting to idle
    setData(resetData.map(point => ({ ...point, analyzed: true })));
  };

  return (
      <Box
        component="section"
        id="light-curves"
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
        Curvas de Luz: Detectando Tránsitos Planetarios
      </Typography>
      
      <Typography
        component="p"
        variant="body1"
        sx={{
          textAlign: "center",
          color: "secondary.dark",
          mb: "1.5rem",
          fontWeight: 400,
          maxWidth: "800px",
        }}
      >
        Cuando un planeta pasa frente a su estrella, el brillo disminuye ligeramente. 
        La detección manual de estos patrones consume semanas de trabajo especializado.
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "common.white",
          border: "1px solid",
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          padding: 3,
          position: "relative",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Analysis Status Indicator */}
        {analysisState === "analyzing" && (
          <Box
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "rgba(0, 191, 255, 0.1)",
              padding: "8px 16px",
              borderRadius: 2,
              border: "1px solid rgba(0, 191, 255, 0.3)",
            }}
          >
            <CircularProgress size={16} sx={{ color: "primary.main" }} />
            <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 600 }}>
              Analizando... {visiblePoints}/{data.length} puntos
            </Typography>
          </Box>
        )}

        {/* Chart */}
        <Box sx={{ height: "250px", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 60, left: 60, bottom: 40 }}>
              <CartesianGrid 
                strokeDasharray="2 2" 
                stroke="rgba(0, 0, 0, 0.1)"
                strokeWidth={0.5}
              />
              <XAxis
                dataKey="time"
                stroke="#333"
                fontSize={11}
                tickLine={true}
                axisLine={true}
                tick={{ fill: "#333", fontSize: "1.1rem" }}
                label={{
                  value: "Tiempo (horas)",
                  position: "insideBottom",
                  offset: -10,
                  style: { textAnchor: "middle", fill: "#333", fontSize: "1.2rem", fontWeight: 500 },
                }}
              />
              <YAxis
                domain={[0.92, 1.01]}
                stroke="#333"
                fontSize={11}
                tickLine={true}
                axisLine={true}
                tick={{ fill: "#333", fontSize: "1.1rem" }}
                label={{
                  value: "Brillo Estelar Normalizado",
                  angle: -90,
                  position: "insideLeft",
                  offset: -10,
                  style: { textAnchor: "middle", fill: "#333", fontSize: "1.2rem", fontWeight: 500 },
                }}
              />
              
              {/* Highlight transit area */}
              {showTransit && (
                <ReferenceArea
                  x1={35}
                  x2={45}
                  y1={0.92}
                  y2={1.01}
                  fill="rgba(112, 135, 234, 0.1)"
                  stroke="rgba(112, 135, 234, 0.5)"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
              )}
              
              <Line
                type="monotone"
                dataKey="brightness"
                stroke="#7087ea"
                strokeWidth={1.5}
                dot={<CustomDot cx={0} cy={0} payload={{ analyzed: false }} />}
                activeDot={{ 
                  r: 4, 
                  fill: "#00BFFF",
                  stroke: "#00BFFF",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={startAnalysis}
            disabled={analysisState === "analyzing"}
            startIcon={
              analysisState === "analyzing" ? (
                <CircularProgress size={16} sx={{ color: "white" }} />
              ) : (
                <PlayArrowIcon />
              )
            }
            sx={{
              backgroundColor: analysisState === "analyzing" ? "grey.400" : "secondary.main",
              color: "white",
              padding: "12px 32px",
              borderRadius: 2,
              fontSize: "1.4rem",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                backgroundColor: analysisState === "analyzing" ? "grey.400" : "secondary.dark",
              },
            }}
          >
            {analysisState === "analyzing" ? "Analizando..." : "Iniciar Análisis"}
          </Button>
          
          <Button
            variant="outlined"
            onClick={resetAnalysis}
            startIcon={<RefreshIcon />}
            sx={{
              borderColor: "grey.400",
              color: "grey.600",
              padding: "12px 32px",
              borderRadius: 2,
              fontSize: "1.4rem",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                borderColor: "grey.600",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            Reiniciar
          </Button>
        </Box>

        {/* Additional Info */}
        {analysisState === "completed" && showTransit && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: "rgba(112, 135, 234, 0.05)",
              border: "1px solid rgba(112, 135, 234, 0.2)",
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: "secondary.dark", textAlign: "center" }}>
              ✅ <strong>Tránsito detectado:</strong> Disminución del 5% en el brillo estelar 
              entre las horas 35-45. El análisis tradicional requiere revisar manualmente 
              miles de puntos de datos.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
