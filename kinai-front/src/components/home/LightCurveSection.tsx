"use client";
import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";

// Evita SSR para ECharts en Next.js
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type AnalysisState = "idle" | "analyzing" | "completed";

// Helpers
function formatDate(d: Date) {
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("/");
}

// Tus puntos (y) fijos:
const points = [
  0.2713626011471899, 0.27876775831018774, 0.4023807263649813,
  0.16726775109805733, 0.3947236216563401, 0.515961881114575,
  0.41381037570772017, -0.10276161930037297, -0.04595549706277729,
  -0.028755552646250623, 0.010367332043557886, 0.11938145702777901,
  -0.07594864322004227, -0.08566051652496531, -0.006007857057829171,
  0.006581424238132939, 0.14227349169804412, 0.10476486136055166,
  0.10997765842090336, -0.22326525780227022, 0.04071501301353048,
  0.14974082341624112, 0.1171984798738069, -0.09032874102206463,
  0.06018480424398995, 0.23421927764854786, -0.05085122480361629,
  -0.12916666623993853, -0.22789122586442417, -0.06495954472964,
  0.12932494291092247, -0.19572513516560194, 0.021003541941170937,
  0.09691723765313132, -0.22060602856147823, -0.4078962230821821,
  0.007269622004837575, 0.08707283660526163, 0.12863858730539132,
  0.1634825303884485, 0.1232068571499914, -0.20020552809454506,
  0.1120325862262902, 0.16802078218845135, -0.5432066167699333, -1.0,
  -0.733701953634729, -0.8992741784954804, -0.910799950981087,
  -0.9707721600986866, -0.8763748822635974, -0.8246895412313813,
  -0.6561025612286208, -0.7675473348054052, -0.7317876317804948,
  -0.7728306124866051, -0.40635481749468333, 0.0525342470376287,
  -0.11469123154510119, -0.12376369673372097, -0.10311797389056901,
  -0.2893056916334355, 0.048483232282923734, -0.09938019082009804,
  0.06775162453097588, 0.11542453729589713, 0.1603465047263822,
  0.16864727782207573, -0.04272138128480835, 0.08378785373648344,
  0.10759874666509973, 0.05428800124514639, 0.0600804605342103,
  -0.2974884235785959, -0.08949902614237493, -0.1666737737039057,
  -0.13558783398635038, 0.06305643217131997, 0.0, -0.3349338819119095,
  -0.016679625820283327, -0.1999631641861923, 0.053576015241014706,
  -0.05132469551176669, 0.20960796043365673, -0.07270058227853024,
  0.06750349346328648, -0.04595549706277729, 0.20313359078292098,
  -0.3041610524177178, 0.08329779921616445, -0.14999507199655518,
  -0.038048783609791026, -0.08643714547364933, 0.1947683588721966,
  -0.04869479416075494, 0.25937654467751337, 0.0832919924434518,
  0.2773376552710015, 0.05583059730934225, 0.3923481866568066,
];

export const LightCurveSection: React.FC = () => {
  // Base temporal (un punto por día)
  const start = useMemo(() => new Date(1997, 9, 3), []);
  const oneDay = 24 * 3600 * 1000;

  // Armamos la serie (time, value) con tus puntos
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
        Light Curves: Detecting Planetary Transits
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
        When a planet passes in front of its star, the brightness slightly
        decreases. Manual detection of these patterns takes weeks of specialized
        work.
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "common.white",
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          padding: 3,
          position: "relative",
        }}
      >
        <Box sx={{ height: "300px", width: "100%" }}>
          <ReactECharts option={option} style={{ height: "100%", width: "100%" }} notMerge lazyUpdate />
        </Box>
      </Box>
    </Box>
  );
};
