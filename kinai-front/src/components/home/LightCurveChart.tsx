"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Box, Typography } from "@mui/material";

interface LightCurveChartProps {
  orbitalPeriod: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

// Generate sample transit light curve data
const generateTransitData = (orbitalPeriod: number) => {
  const data = [];
  const transitDuration = orbitalPeriod * 0.1; // Transit lasts 10% of orbital period
  const transitDepth = 0.01; // 1% decrease in brightness
  
  // Generate data points for one complete orbital period
  for (let i = 0; i <= 100; i++) {
    const time = (i / 100) * orbitalPeriod;
    let brightness = 1.0; // Normal brightness
    
    // Create transit dip
    if (time >= orbitalPeriod * 0.4 && time <= orbitalPeriod * 0.4 + transitDuration) {
      const transitProgress = (time - orbitalPeriod * 0.4) / transitDuration;
      if (transitProgress <= 0.1) {
        // Transit ingress
        brightness = 1.0 - (transitProgress / 0.1) * transitDepth;
      } else if (transitProgress >= 0.9) {
        // Transit egress
        brightness = 1.0 - ((1 - transitProgress) / 0.1) * transitDepth;
      } else {
        // Full transit
        brightness = 1.0 - transitDepth;
      }
    }
    
    // Add some noise to make it more realistic
    const noise = (Math.random() - 0.5) * 0.002;
    brightness += noise;
    
    data.push({
      time: time.toFixed(1),
      brightness: brightness.toFixed(6),
      day: time.toFixed(1),
    });
  }
  
  return data;
};

export const LightCurveChart: React.FC<LightCurveChartProps> = ({
  orbitalPeriod,
}) => {
  const data = generateTransitData(orbitalPeriod);

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid rgba(140, 156, 228, 0.3)",
            fontSize: "1.2rem",
          }}
        >
          <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
            Día: {label}
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Brillo: {(payload[0].value * 100).toFixed(3)}%
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "300px",
        padding: 2,
        backgroundColor: "#fafafa",
        borderRadius: 2,
        border: "1px solid rgba(140, 156, 228, 0.3)",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 50,
            left: 50,
            bottom: 20,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(140, 156, 228, 0.2)"
            strokeWidth={1}
          />
          <XAxis
            dataKey="day"
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#666" }}
            label={{
              value: "Tiempo (días)",
              position: "insideBottom",
              offset: -20,
              style: { textAnchor: "middle", fill: "#666", fontSize: "1.2rem" },
            }}
          />
          <YAxis
            domain={[0.985, 1.005]}
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#666" }}
            label={{
              value: "Brillo Relativo",
              angle: -90,
              position: "insideLeft",
              offset: -20,
              style: { textAnchor: "middle", fill: "#666", fontSize: "1.2rem" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine 
            y={1.0} 
            stroke="#7087ea" 
            strokeDasharray="2 2" 
            strokeWidth={1}
            label={{ value: "Brillo Normal", position: "top", fill: "#7087ea" }}
          />
          <Line
            type="monotone"
            dataKey="brightness"
            stroke="transparent"
            strokeWidth={0}
            dot={{ 
              r: 3, 
              fill: "#00BFFF",
              stroke: "#00BFFF",
              strokeWidth: 1,
            }}
            activeDot={{ 
              r: 5, 
              fill: "#7087ea",
              stroke: "#7087ea",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
