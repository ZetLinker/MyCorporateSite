import React, { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import office01 from "../../../assets/office01.jpg"; // 画像のパスを指定
import { underlineAnimationBlack } from "../../util/UnderlineAnimation"; // underlineAnimationBlackをインポート
import {
  slideInFromLeftAnimation,
  slideInFromRightAnimation,
} from "../../util/SlideInAnimation"; // スライドインアニメーションをインポート

const CompanySection: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "auto", md: "150vh" }, // モバイルでは高さを自動調整
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "transparent",
        padding: { xs: "10px", md: "20px" }, // モバイルでパディングを調整
      }}
    >
      {/* 上部に重なるボックス */}
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: { xs: "5%", md: "0%" }, // モバイルで少し左寄せ
          width: { xs: "90%", md: "15%" }, // モバイルで幅を広げる
          height: { xs: "10%", md: "20%" }, // モバイルで高さを調整
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: { xs: "none", md: "block" },
          zIndex: 1,
          animation: hasAnimated ? slideInFromLeftAnimation : "none",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          left: { xs: "5%", md: "0%" }, // モバイルで少し左寄せ
          width: { xs: "90%", md: "15%" }, // モバイルで幅を広げる
          height: { xs: "10%", md: "20%" }, // モバイルで高さを調整
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: { xs: "none", md: "block" },
          zIndex: 1,
          animation: hasAnimated ? slideInFromRightAnimation : "none",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "80%",
          left: { xs: "5%", md: "0%" }, // モバイルで少し左寄せ
          width: { xs: "90%", md: "15%" }, // モバイルで幅を広げる
          height: { xs: "10%", md: "20%" }, // モバイルで高さを調整
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: { xs: "none", md: "block" },
          animation: hasAnimated ? slideInFromLeftAnimation : "none",
        }}
      ></Box>

      {/* 見出しと画像 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          maxWidth: "1200px",
          marginBottom: "20px",
          flexDirection: { xs: "column", md: "row" }, // モバイルで縦方向に配置
          position: "relative",
          zIndex: 2,
          mt: { xs: 4, md: 0 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "black",
            fontWeight: "bold",
            opacity: 0.8,
            letterSpacing: "0.2em",
            fontSize: { xs: "20px", md: "36px" }, // モバイルでフォントサイズを調整
            marginBottom: { xs: 4, md: "0" }, // モバイルで余白を追加
            ...underlineAnimationBlack,
          }}
        >
          COMPANY.
        </Typography>
        <Box
          component="img"
          src={office01}
          alt="Company"
          sx={{
            width: { xs: "100%", md: "40%" }, // モバイルで幅を調整
            height: "auto",
            position: "relative",
            top: { xs: "0", md: "-100px" }, // モバイルでは位置を変更しない
            zIndex: 3,
            opacity: 0.9,
            animation: hasAnimated ? slideInFromRightAnimation : "none",
          }}
        />
      </Box>

      {/* 会社情報 */}
      <Box className="compbox" sx={{ mb: { xs: 5, md: 10 }, width: "100%" }}>
        {[
          {
            label: "会社名",
            value: "（当サイトはSampleになりますご容赦ください）kanehara.web",
          },
          { label: "代表者", value: "金原 隆利 (Kanehara Takato)" },
          { label: "事業開始年月", value: "2024年08月" },
          {
            label: "住所",
            value: "東京都 新宿区 西新宿3丁目3番13号\n西新宿水間ビル2F",
          },
          {
            label: "事業内容",
            value:
              "ITコンサティング\nウェブサイト制作・運用事業\nウェブアプリ開発・運用事業\nDX推進支援\n地域イベントプロモーション支援\nITスキルトレーニング事業",
          },
        ].map((item, index) => (
          <Box
            key={index}
            className="company_box"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid",
              borderColor: "primary.main",
              pt: 8,
              pb: 2,
              width: { xs: "90%", md: "60%" },
              margin: "0 auto",
              flexDirection: { xs: "column", md: "row" }, // モバイルで縦方向に配置
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "30%" },
                textAlign: { xs: "center", md: "right" },
                pr: { xs: 0, md: 2 },
                position: "relative",
                marginBottom: { xs: 2, md: 0 }, // モバイルで余白を追加
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  width: { xs: "5px", md: "5px" },
                  height: { xs: "30px", md: "100%" },
                  backgroundColor: "primary.main",
                  transform: { xs: "none", md: "translateY(-50%)" },
                  marginBottom: { xs: 1, md: 0 },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  display: "inline-block",
                  width: "100%",
                  pr: { xs: 0, md: 2 },
                  color: "primary.main",
                  textAlign: "center",
                  fontSize: { xs: "16px", md: "inherit" }, // モバイルでフォントサイズを調整
                }}
              >
                {item.label}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                display: "inline-block",
                textAlign: { xs: "center", md: "left" },
                width: { xs: "100%", md: "65%" },
                marginTop: { xs: 1, md: 0 },
                fontSize: { xs: "14px", md: "inherit" }, // モバイルでフォントサイズを調整
              }}
            >
              {item.value.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CompanySection;
