// src/components/pages/HeroSection.tsx
import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import heroImagePc from "../../../assets/hero_pc.webp";
import heroImageMb from "../../../assets/hero_mb.webp";
import logoImage from "../../../assets/logo.svg";
import CustomRectangle from "../../util/CustomRectangle";
import NewsStream from "../../util/NewsStream";
import CircularText from "../../util/CircularText";

interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
}

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const rectangleColor = "rgba(255, 255, 255, 0)";
  const backgroundRef = useRef<HTMLDivElement>(null);

  const [newsData, setNewsData] = useState<NewsItem[]>([]); // ニュースデータの状態

  // スクロールに応じたズームインエフェクト
  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollPosition = window.scrollY;
        const scale = 1 + scrollPosition * 0.0003;
        backgroundRef.current.style.transform = `scale(${Math.min(
          scale,
          1.02
        )})`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ニュースを取得する関数
  const fetchNews = async () => {
    try {
      const db = getFirestore();
      const newsCollection = collection(db, "news");
      const q = query(
        newsCollection,
        where("isDelete", "==", false),
        where("isDisplay", "==", true),
        where("isDraft", "==", false),
        where("date", "<=", Timestamp.now()), // 現在日時までのものを取得
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data: NewsItem[] = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          date: docData.date
            ? docData.date.toDate().toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            : "日付不明",
          title: docData.title || "タイトル不明",
          content: docData.content || "内容がありません。",
        };
      });
      setNewsData(data.slice(0, 4)); // 4件だけ取得
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // 初回ロード時にニュースを取得
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Box id="heroSection" sx={{ position: "relative" }}>
      <Box
        ref={backgroundRef}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${isMobile ? heroImageMb : heroImagePc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: { xs: "100vh", sm: "140vh" },
          transition: "transform 0.2s ease-out", // 変化をスムーズにするためのトランジション
        }}
      />
      <CustomRectangle
        color={rectangleColor}
        size={{ width: "40%", height: "clamp(70px, 8.0vw, 100px)" }}
        zIndex={0}
        direction={true}
        sx={{
          position: "absolute",
          bottom: { xs: "75%", sm: "70%" },
          left: { xs: "5%", sm: "8%" },
          opacity: 0.9,
          minWidth: { xs: "370px", sm: "400px" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "30%", sm: "70%" },
            left: { xs: "20px", sm: "6%" },
            zIndex: 1,
            textAlign: "left",
            color: "black",
            maxWidth: { xs: "90%", sm: "100%" },
            top: "20%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: "clamp(12px, 1.3vw, 24px)",
              letterSpacing: "clamp(0.05em, 0.1vw, 0.05em)",
              whiteSpace: "nowrap",
            }}
          >
            People become the lines that weave the future.
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontSize: "clamp(12px, 1vw, 14px)",
              letterSpacing: "clamp(0.05em, 0.1vw, 0.1em)",
              mb: { xs: 1, sm: 2.5 },
            }}
          >
            <Box component="span" sx={{ fontSize: "clamp(12px, 1vw, 16px)" }}>
              人
            </Box>
            と
            <Box component="span" sx={{ fontSize: "clamp(12px, 1vw, 16px)" }}>
              人
            </Box>
            が、
            <Box component="span" sx={{ fontSize: "clamp(12px, 1vw, 16px)" }}>
              未来
            </Box>
            をつむぐ
            <Box component="span" sx={{ fontSize: "clamp(12px, 1vw, 16px)" }}>
              線
            </Box>
            になる
          </Typography>
        </Box>
      </CustomRectangle>

      <CustomRectangle
        color={rectangleColor}
        size={{ width: "30%", height: "clamp(100px, 8.0vw, 150px)" }} // 横長に調整
        zIndex={0} // Rectangleを背面に設定
        direction={true}
        sx={{
          position: "absolute",
          bottom: { xs: "35%", sm: "50%" }, // `Box` の背面に調整
          left: { xs: "5%", sm: "8%" }, // 他のCustomRectangleとleftを合わせる
          transform: "translateX(-10%)", // 必要に応じて調整
          opacity: 0.9,
          minWidth: { xs: "260px", sm: "290px" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "35%", sm: "40%" },
            mx: "clamp(10px, 1.8vw, 50px)",
            zIndex: 1,
            textAlign: "left",
            color: "black",
            maxWidth: { xs: "90%", sm: "100%" },
            top: "20%",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontSize: "clamp(12px, 1.8vw, 34px)", // clampでフォントサイズを調整
              letterSpacing: "clamp(0.05em, 0.1vw, 0.1em)",
              whiteSpace: "nowrap",
              mb: { xs: 1, sm: 1.5 },
            }}
          >
            Region × Digital
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "clamp(12px, 1vw, 16px)", // clampでフォントサイズを調整
              mb: { xs: 1, sm: 2.5 },
              fontWeight: "bold",
              letterSpacing: "clamp(0.05em, 0.1vw, 0.05em)",
              whiteSpace: "nowrap",
            }}
          >
            <Box component="span" sx={{ fontSize: "clamp(12px, 1vw, 18px)" }}>
              デジタル
            </Box>
            の
            <Box component="span" sx={{ fontSize: "clamp(12px, 1vw, 18px)" }}>
              力
            </Box>
            で
            <Box component="span" sx={{ fontSize: "clamp(12px, 1vw, 18px)" }}>
              地域
            </Box>
            の
            <Box component="span" sx={{ fontSize: "clamp(12px, 1vw, 18px)" }}>
              未来
            </Box>
            を共創します
          </Typography>
        </Box>
      </CustomRectangle>

      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "30%", sm: "35%" },
          left: { xs: "5%", sm: "8%" },
          zIndex: 1,
          textAlign: "left",
          color: "black",
          maxWidth: { xs: "90%", sm: "80%" },
        }}
      >
        <Box
          component="img"
          src={logoImage}
          alt="logo.svg"
          sx={{
            width: { xs: "12px", sm: "clamp(14px, 1vw, 20px)" },
            height: "auto",
            transition: "transform 2s cubic-bezier(0.25, 0.1, 0.25, 1)",
            "&:hover": {
              transform: "rotate(100deg)",
            },
            mr: 1,
          }}
        />
        <Box
          component="span"
          sx={{
            fontSize: { xs: "8px", sm: "clamp(12px, 1vw, 16px)" },
            mb: { xs: 1, sm: 2.5 },
            fontWeight: "bold",
            letterSpacing: "clamp(0.05em, 0.1vw, 0.05em)",
          }}
        >
          ZetLinker at 埼玉県志木市
        </Box>
      </Box>
      <CustomRectangle
        color={rectangleColor}
        size={{ width: "40%", height: "100px" }} // 横長に調整
        zIndex={1} // zIndexを高く設定して前面に表示
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "76%", sm: "80%" }, // xsサイズではトップ位置を調整
          left: { xs: "5%", sm: "8%" }, // 他のCustomRectangleとleftを合わせる
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: 0,
            fontSize: "clamp(12px, 1vw, 16px)", // clampでフォントサイズを調整
            color: "black",
            textAlign: "left",
            zIndex: 2,
            mt: 2,
            ml: 2,
          }}
        >
          Latest News
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: "40px",
            width: "95%",
            zIndex: 2,
            textAlign: "left",
          }}
        >
          <NewsStream news={newsData} /> {/* ニュースを表示 */}
        </Box>
      </CustomRectangle>

      <Box
        sx={{
          position: "absolute",
          top: { xs: "25%", sm: "20%", md: "20%" },
          left: { xs: "55%", sm: "55%", md: "45%" },
          width: "100%",
          mx: "15%",
          zIndex: 100,
        }}
      >
        <CircularText text="Region×Digital" size={isMobile ? 126 : 126} />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: { xs: "40%", sm: "30%", md: "30%" },
          left: { xs: "30%", sm: "60%", md: "60%" },
          width: "100%",
          mx: "15%",
          zIndex: 100,
        }}
      >
        <CircularText text="Zet Linker" size={isMobile ? 88 : 216} />
      </Box>
    </Box>
  );
};

export default HeroSection;
