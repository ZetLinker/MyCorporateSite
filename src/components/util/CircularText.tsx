import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CircularTextProps {
  text: string; // 表示するテキスト
  link?: string; // クリック時の遷移先（任意）
  size?: number; // 円形のサイズ（デフォルトは 350）
  color?: string; // テキストの色（オプション）
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  link,
  size = 350,
  color, // Add color prop
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // モバイルの判定
  const [pathId, setPathId] = useState<string>("");

  // コンポーネントごとにユニークなIDを生成
  useEffect(() => {
    setPathId(`circularPath-${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  // テキストを繰り返し表示させるために、必要な回数を動的に決定
  const repeatedText = (inputText: string, minLength: number) => {
    let repeated = inputText;
    while (repeated.length < minLength) {
      repeated += " " + inputText; // テキストを繰り返して追加
    }
    return repeated.trim(); // 余計なスペースをトリム
  };

  const handleClick = () => {
    if (link) navigate(link);
  };

  // Determine text color based on link and provided color prop
  const textColor = color || (link ? "#000" : "#fff");

  return (
    <Box
      sx={{
        position: "relative",
        width: `${size}px`, // 渡されたサイズを使用
        height: `${size}px`, // 渡されたサイズを使用
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        transition: link ? "transform 0.6s ease" : "none", // リンクがある場合のみアニメーション
        cursor: link ? "pointer" : "default", // リンクがある場合のみポインターを表示
        "&:hover": {
          transform: link ? "scale(0.85)" : "none", // リンクがある場合のみ縮める
        },
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          animation: "rotateText 30s linear infinite",
          "@keyframes rotateText": {
            from: {
              transform: "rotate(0deg)",
            },
            to: {
              transform: "rotate(360deg)",
            },
          },
        }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <path
              id={pathId} // ユニークなIDを適用
              d={`M ${size / 2}, ${size / 2} m -${size * 0.37}, 0 a ${
                size * 0.37
              },${size * 0.37} 0 1,1 ${size * 0.74},0 a ${size * 0.37},${
                size * 0.37
              } 0 1,1 -${size * 0.74},0`}
            />
          </defs>
          <text
            fill={textColor} // Use the determined color
            fontSize={isMobile ? "10" : "16"} // モバイルの場合のみ10pxに変更
            letterSpacing="0.1em" // 各文字の間隔を調整
            fontWeight="bold"
            opacity={link ? 0.9 : 1}
          >
            <textPath href={`#${pathId}`} startOffset="0" textLength="1000">
              {repeatedText(text, 100)} {/* 必要な長さになるまで繰り返す */}
            </textPath>
          </text>
        </svg>
      </Box>
    </Box>
  );
};

export default CircularText;
