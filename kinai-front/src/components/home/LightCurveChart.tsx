"use client";
import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import ReactECharts from "echarts-for-react";

interface LightCurveChartProps {
  points: number[];
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

function formatDate(d: Date) {
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("/");
}

export const LightCurveChart: React.FC<LightCurveChartProps> = ({ points }) => {
    console.log(points);
    const start = useMemo(() => new Date(1997, 9, 3), []);
      const oneDay = 24 * 3600 * 1000;
    const seriesData = useMemo(
        () =>
          points.map((y, i) => {
            const d = new Date(start.getTime() + (i + 1) * oneDay);
            return {
              name: d.toString(),
              value: [formatDate(d), y] as [string, number],
            };
          }),
        [start]
      );
    
      const option = useMemo(() => {
        return {
          title: { text: "Light Curve (Fixed Points)" },
          grid: { left: 60, right: 60, top: 40, bottom: 50 },
          xAxis: {
            type: "category",
            show: false,
          },
          yAxis: {
            type: "value",
            boundaryGap: [0, "5%"],
            splitLine: { show: true },
            name: "Relative Flux",
            nameLocation: "middle",
            nameGap: 40,
          },
          series: [
            {
              name: "Flux",
              type: "line",
              showSymbol: false,
              data: seriesData,
              smooth: true,
              lineStyle: { width: 1.5 },
              areaStyle: { opacity: 0.05 },
              markArea: {
                itemStyle: {
                  color: "rgba(255, 173, 177, 0.4)",
                },
                data: [
                  [
                    {
                      name: "Exoplanet Candidate",
                      xAxis: 40,
                    },
                    {
                      xAxis: 59,
                    },
                  ],
                ],
              },
            },
          ],
        };
      }, [seriesData]);

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
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
      />
    </Box>
  );
};
