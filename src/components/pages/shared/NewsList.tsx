import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import news_info from "../../../assets/news_info.png";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase-config"; // Firestoreの設定ファイルをインポート

const NewsList: React.FC = () => {
  const [newsList, setNewsList] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const today = new Date().toISOString().split("T")[0]; // 今日の日付
      const q = query(
        collection(db, "news"),
        where("date", "<=", today),
        where("isDisplay", "==", true), // isDisplayがtrueのものを取得
        orderBy("date", "desc"),
        limit(20) // 最大20件まで取得
      );
      const querySnapshot = await getDocs(q);
      const newsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewsList(newsData);
    };
    fetchNews();
  }, []);

  const handleNewsClick = (news: any) => {
    navigate(`/news/detail`, { state: { news } }); // 詳細ページへ遷移し、ニュースデータを渡す
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          mt: { xs: 7, md: 10 },
          color: "primary.main",
          textAlign: "center",
          fontSize: { xs: "20px", md: "inherit" },
        }}
      >
        NEWS.
      </Typography>
      <Box
        component="section"
        className="news_area"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 5,
          mt: 12,
          textAlign: "center",
          position: "relative",
          width: "100%",
          "@media (max-width: 600px)": {
            mt: 4,
            my: 2,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // 中央に配置するために修正
              justifyContent: "center",
              position: "absolute", // 絶対位置で配置
              left: { xs: "5%", md: "11%" }, // モバイルで少し右に寄せる
              top: { xs: "50%", md: "-20px" }, // モバイルでは中央に、デスクトップでは上に配置
              transform: { xs: "translateY(-50%)", md: "none" }, // モバイルで上下中央に配置
              "@media (max-width: 600px)": {
                mb: 3,
              },
            }}
          >
            <Box
              component="img"
              src={news_info}
              alt="kanehara.web"
              sx={{
                width: { xs: "20px", md: "40px" }, // モバイルで少し大きくする
                height: "auto",
                position: "relative",
              }}
            />
          </Box>

          <Box
            sx={{
              overflowY: "auto", // スクロールを有効にする
              height: "200px", // 最大高さを設定
              width: "100%", // 全幅を確保
              ml: { xs: "60px", md: "30%" }, // モバイルで右に寄せるために余白を追加
              mr: { xs: "30px", md: "30%" },
            }}
          >
            <List
              sx={{
                paddingTop: 0,
                textAlign: "center", // テキストを中央寄せ
              }}
            >
              {newsList.map((news, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleNewsClick(news)}
                  sx={{
                    paddingY: 0.5, // 上下のパディングを小さくする
                    minHeight: "40px", // 各アイテムの最小高さを指定
                    justifyContent: "center", // アイテム自体を中央寄せ
                  }}
                >
                  <ListItemText
                    primary={`・${new Date(news.date).toLocaleDateString(
                      "ja-JP",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )} - ${news.title}`}
                    sx={{
                      textDecoration: "underline", // 下線を追加
                      cursor: "pointer", // カーソルをポインタに変更
                      "& .MuiTypography-root": {
                        fontSize: { xs: "12px", md: "16px" }, // モバイルでは12px、PCではデフォルトのサイズ
                      },
                      "&:hover": {
                        color: "primary.main", // ホバー時に色を変更
                        textDecoration: "none", // ホバー時に下線を消す
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NewsList;
