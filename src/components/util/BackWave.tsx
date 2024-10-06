import React from "react";
import { Box, useTheme } from "@mui/material";
import { keyframes, css } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

interface BackWaveProps {
  wave: number[];
  colors?: string[];
}

const BackWave: React.FC<BackWaveProps> = ({ wave, colors }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // デフォルトのカラー配列
  const defaultColors = ["#9ac6f3", "#66ccff", "#4db8ff", "#3399ff", "#1a8cff"];
  const strokeColors = colors || defaultColors;

  // wave配列に基づいて波の要素を生成
  const waves = wave.map((waveNumber, index) => {
    const color = strokeColors[index % strokeColors.length];
    return (
      <WaveComponent
        key={index}
        waveType={waveNumber}
        strokeColor={color}
        isMobile={isMobile}
      />
    );
  });

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        transform: "translate(-50%, -50%)", // 中心に寄せる
        height: { xs: "80%", md: "100%" },
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: -10,
      }}
    >
      <Box
        component="svg"
        viewBox={isMobile ? "0 0 1440 600" : "0 0 1440 400"}
        preserveAspectRatio="none"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "105%",
          height: "100%",
        }}
      >
        {waves}
      </Box>
    </Box>
  );
};

// アニメーションを生成する関数
const generateWaveAnimation = (
  startPath: string,
  midPath: string,
  endPath: string
) => css`
  0% {
    d: path("${startPath}");
  }
  50% {
    d: path("${midPath}");
  }
  100% {
    d: path("${endPath}");
  }
`;

// 波のデータ
const waveData = [
  {
    d: "M0,50 Q360,220,720,200 T1440,310",
    mid: "M0,50 Q360,250,720,170 T1440,310",
    duration: 10,
  },
  {
    d: "M0,80 Q360,270,720,250 T1440,320",
    mid: "M0,80 Q360,300,720,220 T1440,320",
    duration: 15,
  },
  {
    d: "M0,110 Q360,220,720,230 T1440,300",
    mid: "M0,110 Q360,250,720,200 T1440,300",
    duration: 13,
  },
  {
    d: "M0,400 Q360,370,720,180 T1440,20",
    mid: "M0,400 Q360,400,720,150 T1440,20",
    duration: 20,
  },
  {
    d: "M0,100 Q360,120,720,200 T1440,300",
    mid: "M0,100 Q360,150,720,170 T1440,300",
    duration: 10,
  },
  {
    d: "M0,300 Q360,200,720,150 T1440,10",
    mid: "M0,300 Q360,230,720,120 T1440,10",
    duration: 12,
  },
  {
    d: "M0,250 Q360,200,720,260 T1440,260",
    mid: "M0,250 Q360,230,720,230 T1440,260",
    duration: 11,
  },
  {
    d: "M0,240 Q360,190,720,270 T1440,270",
    mid: "M0,240 Q360,220,720,240 T1440,270",
    duration: 14,
  },
  {
    d: "M0,260 Q360,220,720,230 T1440,230",
    mid: "M0,260 Q360,250,720,200 T1440,230",
    duration: 16,
  },
  {
    d: "M0,280 Q360,240,720,220 T1440,240",
    mid: "M0,280 Q360,270,720,190 T1440,240",
    duration: 18,
  },
  {
    d: "M0,80 Q360,70,720,200 T1440,300",
    mid: "M0,80 Q360,100,720,170 T1440,300",
    duration: 19,
  },
  {
    d: "M0,350 Q360,350,720,190 T1440,50",
    mid: "M0,350 Q360,380,720,160 T1440,50",
    duration: 11, // 21 - 10
  },
];

// 波のコンポーネント
const WaveComponent: React.FC<{
  waveType: number;
  strokeColor: string;
  isMobile: boolean;
}> = ({ waveType, strokeColor, isMobile }) => {
  if (waveType < 1 || waveType > waveData.length) return null;

  const { d, mid, duration } = waveData[waveType - 1];
  const waveAnimation = generateWaveAnimation(d, mid, d);

  return (
    <Box
      component="path"
      sx={{
        fill: "none",
        strokeWidth: isMobile ? 2 : 3, // モバイルでは線を細く
        stroke: strokeColor,
        vectorEffect: "non-scaling-stroke",
        opacity: 0.5,
        animation: `${waveAnimation} ${duration}s ease-in-out infinite`,
      }}
      d={d}
    />
  );
};

export default BackWave;
