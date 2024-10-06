import React from "react";
import { Box, Typography } from "@mui/material";

import ValueBox from "../util/ValueBox";
import ImageSlider from "../util/ImageSlider";
import PhilosophySection from "./shared/PhilosophySection";
import MethodParts from "./shared/MethodParts";
import PhilosophyParts from "./shared/PhilosophyParts";
import FadeInOnScroll from "../util/FadeInOnScroll"; // FadeInOnScrollのインポート

// 画像のインポート
import flowcopy2 from "../../assets/flowcopy2.png";
import aim_title from "../../assets/aim_title.png";
import aim_img01 from "../../assets/aim_img01.png";
import aim_img02 from "../../assets/aim_img02.png";

const Philosophy: React.FC = () => {
  return (
    <Box id="wrapper" sx={{ opacity: 1 }}>
      <Box className="contents">
        {/* PHILOSOPHYセクション */}
        <FadeInOnScroll>
          <PhilosophySection />
        </FadeInOnScroll>

        {/* VALUESセクション */}
        <FadeInOnScroll>
          <Box
            component="section"
            sx={{
              width: "100%",
              textAlign: "center",
              minHeight: "50vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px 0", // 上下のパディングを調整
            }}
          >
            <Typography
              variant="h4"
              sx={{
                width: "100%",
                textAlign: "center",
                mb: 5,
                color: "primary.main",
                padding: "20px 0",
                fontSize: { xs: "20px", md: "inherit" }, // モバイル用のフォントサイズ調整
              }}
            >
              VALUES.
            </Typography>
            <Box
              className="valuebox"
              sx={{
                display: "flex",
                justifyContent: "center", // 要素を中央に配置
                alignItems: "flex-start", // 上揃えにするために追加
                flexWrap: "wrap", // フレックスボックスの要素を折り返し
                width: "100%", // 全体幅を100%に設定
                maxWidth: "1200px", // 最大幅を設定
                gap: "16px", // ボックス間の間隔を設定
                "@media (max-width: 600px)": {
                  flexDirection: "column",
                  alignItems: "center", // モバイルで中央揃え
                },
              }}
            >
              <ValueBox
                number="01"
                title="デジタルプレゼンスの強化"
                description={`インターネット上での企業の存在を高め、\nブランドの価値を向上させます。`}
              />
              <ValueBox
                number="02"
                title="より良い時間の最大化"
                description={`デジタル技術を使って、\n時間の無駄を減らし、\nもっと有意義に過ごせるようにします。`}
              />
              <ValueBox
                number="03"
                title="地域の最新化"
                description={`最新のデジタル技術を導入して、\n地域の活力を高め、\n住みやすい環境を作ります。`}
              />
            </Box>
          </Box>
        </FadeInOnScroll>

        {/* スライドセクション */}
        <ImageSlider images={[flowcopy2]} backgroundColor="primary.main" />

        {/* AIMセクション */}

        <Box
          component="section"
          className="aim"
          sx={{ textAlign: "center", my: 5 }}
        >
          <FadeInOnScroll>
            <Typography
              variant="h4"
              sx={{
                width: "100%",
                textAlign: "center",
                mb: 5,
                color: "primary.main",
                padding: "20px 0",
                fontSize: { xs: "20px", md: "inherit" }, // モバイル用のフォントサイズ調整
              }}
            >
              VISION.
            </Typography>

            <Typography
              variant="h2"
              sx={{
                my: 3,
                fontSize: { xs: "24px", md: "40px" }, // モバイル用のフォントサイズ調整
              }}
            >
              私たちが目指す姿
            </Typography>
          </FadeInOnScroll>

          {/* aim_title と aim_img01, aim_title と aim_img02 をそれぞれひとまとまりにして縦に配置 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // 中央揃え
              my: 5,
            }}
          >
            {/* 1つ目のまとまり */}
            <FadeInOnScroll>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 10,
                }}
              >
                <Box
                  component="img"
                  src={aim_title}
                  alt="aim_title"
                  sx={{
                    width: "90%",
                    height: "auto",
                    mx: "auto",
                  }}
                />
                <Box
                  component="img"
                  src={aim_img01}
                  alt="aim_img01"
                  sx={{
                    width: "90%",
                    height: "auto",
                    mx: "auto",
                  }}
                />
              </Box>
            </FadeInOnScroll>
            {/* 2つ目のまとまり */}
            <FadeInOnScroll>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={aim_title}
                  alt="aim_title"
                  sx={{
                    width: "90%",
                    height: "auto",
                    mx: "auto",
                  }}
                />
                <Box
                  component="img"
                  src={aim_img02}
                  alt="aim_img02"
                  sx={{
                    width: "90%",
                    height: "auto",
                    mx: "auto",
                  }}
                />
              </Box>
            </FadeInOnScroll>
          </Box>
        </Box>

        {/* サービスセクション */}
        <FadeInOnScroll>
          <PhilosophyParts />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <MethodParts />
        </FadeInOnScroll>
      </Box>
      {/* フッターセクション */}
      <ImageSlider images={[flowcopy2]} backgroundColor="primary.main" />
    </Box>
  );
};

export default Philosophy;
