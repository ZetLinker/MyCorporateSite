import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomRectangle from "../../util/CustomRectangle"; // CustomRectangleをインポート
import CircularText from "../../util/CircularText";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from "firebase/firestore"; // Firestoreをインポート
import { app } from "../../../firebase-config"; // Firebaseアプリのインスタンスをインポート
import { Link as RouterLink } from "react-router-dom"; // RouterLinkをインポート

const NewsSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [newsItems, setNewsItems] = useState<
    { date: string; title: string; id: string }[]
  >([]);

  useEffect(() => {
    const fetchNews = async () => {
      const db = getFirestore(app);
      const newsCollection = collection(db, "news");
      const q = query(
        newsCollection,
        where("isDelete", "==", false),
        where("isDisplay", "==", true),
        where("isDraft", "==", false),
        where("date", "<=", Timestamp.now()), // 現在日時までのものを取得
        orderBy("date", "desc"),
        limit(4) // 最大4つまで取得
      );

      const querySnapshot = await getDocs(q);
      const newsData = querySnapshot.docs.map((doc) => ({
        date: doc
          .data()
          .date.toDate()
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "."),
        title: doc.data().title,
        id: doc.id, // ドキュメントIDを取得
      }));
      setNewsItems(newsData);
    };

    fetchNews();
  }, []);

  return (
    <Box
      id="newsSection"
      sx={{
        position: "relative",
        minHeight: { xs: "932px", sm: "970px" },
        height: "auto",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: "20px", sm: "80px 40px" },
      }}
    >
      {/* 上部の背景ボックス */}
      <CustomRectangle
        size={{
          width: { xs: "70%", sm: "50%" },
          height: { xs: "120px", sm: "150px" },
        }}
        zIndex={50}
        direction={false}
        sx={{
          position: "absolute",
          top: { xs: "5%", sm: "5%" },
          right: { xs: "-10%", sm: "-5%" },
        }}
      >
        {/* タイトルボックス */}
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            left: "5%",
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
                sm: "clamp(24px, 2.5vw, 30px)", // Responsive font size
              },
              mx: 2,
            }}
          >
            NEWS
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#e64525",
              fontWeight: "bold",
              textAlign: "left",
              fontSize: {
                xs: "10px",
                sm: "clamp(12px, 2vw, 14px)", // Responsive font size
              },
              mx: 2,
            }}
          >
            - 最新情報
          </Typography>
        </Box>
      </CustomRectangle>

      {/* Additional background rectangles */}
      <CustomRectangle
        color={true}
        size={{
          width: { xs: "90%", sm: "80%" },
          height: { xs: "80px", sm: "100px" },
        }}
        zIndex={49}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "13%", sm: "15%" },
          left: { xs: "-5%", sm: "-5%" },
        }}
      />
      <CustomRectangle
        size={{
          width: { xs: "60%", sm: "40%" },
          height: { xs: "400px", sm: "550px" },
        }}
        zIndex={48}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "20%", sm: "20%" },
          left: { xs: "-5%", sm: "-5%" },
        }}
      />
      <CustomRectangle
        size={{
          width: { xs: "100%", sm: "90%" },
          height: { xs: "150px", sm: "200px" },
        }}
        zIndex={47}
        direction={true}
        sx={{
          position: "absolute",
          top: { xs: "65%", sm: "70%" },
          left: { xs: "-5%", sm: "-5%" },
        }}
      />

      {/* ニュースリストのボックス */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "25%", sm: "27%" },
          left: { xs: "5%", sm: "25%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
          width: { xs: "90%", sm: "90%" },
          mt: { xs: 0, sm: 5 },
        }}
      >
        {newsItems.map((item, index) => (
          <Box
            key={index}
            component={RouterLink}
            to={`/news/${item.id}`} // 詳細ページへのリンク
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              width: { xs: "80%", sm: "50%" },
              textDecoration: "none",
              color: "black",
              cursor: "pointer",
              "&:hover .title": {
                "&::after": {
                  width: "105%",
                },
              },
            }}
          >
            {/* 番号を囲むボックス */}
            <CustomRectangle
              color="white"
              size={{
                width: { xs: "50px", sm: "70px" },
                height: { xs: "50px", sm: "70px" },
              }}
              zIndex={50}
              direction={true}
              sx={{
                position: "absolute",
                top: { xs: "-5%", sm: "-10%" },
                left: { xs: "-20px", sm: "-40px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "12px", sm: "14px" },
                  color: "black",
                  mb: 4,
                  ml: 1.5, // 反対に変更
                }}
              >
                {`0${index + 1}.`}
              </Typography>
            </CustomRectangle>

            {/* DateとTitleを表示するボックス */}
            <CustomRectangle
              color="white"
              size={{
                width: { xs: "100%", sm: "100%" },
                height: { xs: "80px", sm: "80px" },
              }}
              zIndex={49}
              direction={true}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: { xs: "4px", sm: "8px" },
                position: "relative",
                minWidth: { xs: "200px", sm: "300px" },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "20%",
                  left: "20%",
                  width: "70%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "10px", sm: "12px" },
                    color: "#888",
                    textAlign: "left",
                    mr: 1,
                  }}
                >
                  {item.date}
                </Typography>
                <Typography
                  variant="h6"
                  className="title"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "12px", sm: "14px" },
                    textAlign: "left",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: { xs: "100%", sm: "100%" },
                    position: "relative",
                    display: "inline-block", // 追加: テキスト要素をインラインブロックに設定
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "0%", // 初期状態では幅0%
                      height: "1.5px", // 下線の高さ
                      backgroundColor: "currentColor",
                      transition: "width 0.6s ease", // 下線の幅にトランジション
                    },
                    "&:hover::after": {
                      width: "105%", // ホバー時にタイトル全体の幅に広がる
                    },
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </CustomRectangle>
          </Box>
        ))}
      </Box>

      {/* 下部の背景ボックス */}
      <CustomRectangle
        size={{
          width: { xs: "105%", sm: "100%" },
          height: { xs: "100px", sm: "150px" },
        }}
        zIndex={2}
        direction={false}
        color="#f2f2f2"
        sx={{
          position: "absolute",
          top: { xs: "80%", sm: "80%" },
          right: { xs: "-5%", sm: "-5%" },
        }}
      />

      {/* Circular Text */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "8%", sm: "5%" },
          left: { xs: "0%", sm: "10%" },
          width: "100%",
          mx: { xs: "5%", sm: "15%" },
          zIndex: 100,
        }}
      >
        <CircularText
          text="NEWS " // Display text
          link="/news" // Click destination path
          size={isMobile ? 102 : 206} // Responsive size
        />
      </Box>
    </Box>
  );
};

export default NewsSection;
