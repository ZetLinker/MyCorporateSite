import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomRectangle from "../../util/CustomRectangle"; // CustomRectangleをインポート

const AimForSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      id="aimForSection"
      sx={{
        position: "relative",
        minHeight: "870px",
        height: "auto",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 背景のカスタム矩形のレイヤー */}
      <CustomRectangle
        size={{
          width: { xs: "80%", sm: "50%" },
          height: { xs: "100px", sm: "150px" },
        }}
        zIndex={50}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "10%", sm: "10%" },
          left: { xs: "-5%", sm: "-5%" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            right: { xs: "30%", sm: "30%" },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "18px",
                sm: "clamp(24px, 2.5vw, 30px)", // フォントサイズをレスポンシブに
              },
              mx: 2,
              letterSpacing: "0.05em",
            }}
          >
            AIM FOR
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#67aac7",
              fontWeight: "bold",
              textAlign: "left",
              fontSize: {
                xs: "10px",
                sm: "clamp(12px, 2vw, 14px)", // フォントサイズをレスポンシブに
              },
              mx: "16px",
              letterSpacing: "0.05em",
            }}
          >
            - 私たちが目指す未来
          </Typography>
        </Box>
      </CustomRectangle>

      <CustomRectangle
        color="white"
        size={{
          width: { xs: "90%", sm: "45%" },
          height: { xs: "350px", sm: "400px" },
        }}
        zIndex={48}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "20%", sm: "25%" },
          left: { xs: "15%", sm: "15%" },
        }}
      >
        {/* テキストを囲むBoxを追加 */}
        <Box
          sx={{
            position: "absolute",
            top: "25%",
            width: "70%",
            mx: "15%", // 中央に寄せるための左右の余白
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontSize: {
                xs: "14px",
                sm: "clamp(16px, 1vw, 18px)", // フォントサイズをレスポンシブに
              },
              mb: 5,
            }}
          >
            賑わいと活気を未来へ繋ぎ、愛される街づくり
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "left",
              color: "black",
              lineHeight: 1.6,
              fontSize: {
                xs: "12px",
                sm: "clamp(12px, 1vw, 14px)", // フォントサイズをレスポンシブに
              },
            }}
          >
            賑わいと活気が溢れる街、ずっと住み続けたい、そして愛される街を目指しています。
            地域の魅力を高めることで、関わるすべての人々が、より豊かで充実した時間を未来に向けて過ごせるように、私たちは全力でサポートします。
          </Typography>
        </Box>
      </CustomRectangle>

      {/* 下部の背景ボックス */}
      <CustomRectangle
        size={{
          width: { xs: "100%", sm: "105%" },
          height: { xs: "100px", sm: "150px" },
        }}
        zIndex={47}
        direction={false}
        sx={{
          position: "absolute",
          top: { xs: "40%", sm: "40%" },
          right: { xs: "-5%", sm: "-5%" },
        }}
      />
      <CustomRectangle
        size={{
          width: { xs: "80%", sm: "40%" },
          height: { xs: "100px", sm: "200px" },
        }}
        zIndex={46}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "60%", sm: "70%" },
          left: { xs: "-5%", sm: "-5%" },
        }}
      />
      <CustomRectangle
        color={false}
        size={{
          width: { xs: "80%", sm: "80%" },
          height: { xs: "100px", sm: "100px" },
        }}
        zIndex={45}
        direction={false}
        sx={{
          position: "absolute",
          top: { xs: "70%", sm: "75%" },
          right: { xs: "-5%", sm: "-5%" },
        }}
      />
    </Box>
  );
};

export default AimForSection;
