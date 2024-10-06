import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { Box, Tabs, Tab, Typography, Chip, Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; // useNavigateとuseLocationをインポート
import CustomEffect from "../util/CustomEffect"; // CustomEffectをインポート

type NewsItem = {
  id: string;
  date: Timestamp; // string から Timestamp に変更
  tag: "お知らせ" | "実績" | "イベント";
  title: string;
  isDelete: boolean;
  isDisplay: boolean;
  isDraft: boolean;
};

const NewsSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("ALL");
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const navigate = useNavigate(); // useNavigateフックを使用
  const location = useLocation(); // useLocationフックを使用

  useEffect(() => {
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
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as NewsItem[];
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [location]); // locationが変更されるたびに再レンダリング

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleNewsClick = (id: string) => {
    navigate(`/news/${id}`); // 詳細ページに遷移
  };

  // タブに基づいてニュースを絞り込む
  const displayedNews =
    selectedTab === "ALL"
      ? newsData
      : newsData.filter((news) => news.tag === selectedTab);

  // ニュースが少ない場合にプレースホルダーを追加して高さを保持
  const totalNews = displayedNews.slice(0, 10); // 10個に制限
  const placeholderCount = 10 - totalNews.length; // プレースホルダーの数

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", position: "relative" }}>
      <CustomEffect>
        <Box
          sx={{
            width: { xs: "90%", sm: "66%", lg: "50%" }, // モバイルで90%、PCで50%の幅
            margin: "0 auto",
            position: "relative",
            textAlign: "center",
            minWidth: "300px", // 全体の最小幅を設定
            mt: { xs: 10, sm: 15 }, // モバイルでは少し上に配置
            py: 5,
            mb: 15,
            minHeight: "100vh", // 高さをSERVICEセクションと揃える
          }}
        >
          <CustomEffect>
            <Typography
              variant="h4"
              sx={{
                color: "black",
                fontWeight: "bold",
                mb: 10,
                fontSize: {
                  xs: "10px",
                  sm: "12px",
                },
              }}
            >
              NEWS
            </Typography>
          </CustomEffect>
          <CustomEffect>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              centered
              variant="fullWidth"
              sx={{
                minWidth: "300px", // タブの最小幅を設定
              }}
            >
              <Tab label="ALL" value="ALL" />
              <Tab label="お知らせ" value="お知らせ" />
              <Tab label="実績" value="実績" />
              <Tab label="イベント" value="イベント" />
            </Tabs>
          </CustomEffect>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: 2,
              mt: 2,
              minWidth: "300px", // 全体の最小幅を設定
              overflowX: "auto", // コンテンツが溢れた際にスクロールさせる
              minHeight: "480px", // 8個分の高さを維持（1つ60pxとして480pxを確保）
            }}
          >
            {totalNews.map((news, index) => (
              <Grid
                container
                key={index}
                onClick={() => handleNewsClick(news.id)} // クリックイベントを追加
                sx={{
                  borderBottom: "1px solid #eee",
                  padding: "8px 0",
                  alignItems: "center",
                  minWidth: "300px", // 最小幅を各ニュース行に設定
                  flexDirection: { xs: "column", sm: "row" }, // モバイルでは縦並び、PCでは横並び
                  height: "auto", // モバイルで高さを自動調整
                  cursor: "pointer", // クリック可能であることを示す
                }}
              >
                {/* 空白のグリッド (PCのみ表示) */}
                <Grid item md={2} display={{ xs: "none", sm: "block" }} />

                {/* モバイル版：日付とタグを縦並びにして改行 */}
                <Grid
                  container
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", sm: "flex-start" },
                    alignItems: { xs: "center", sm: "center" }, // モバイルでは左寄せ
                    flexDirection: { xs: "column", sm: "row" }, // モバイルでは縦並び、PCでは横並び
                    flexWrap: "nowrap", // 折り返さない
                  }}
                >
                  <CustomEffect>
                    <Typography
                      sx={{
                        fontSize: { xs: "10px", sm: "12px" },
                        minWidth: "80px",
                        whiteSpace: "nowrap", // 折り返しを防止
                        mt: { xs: 1, sm: 1 }, // モバイル時に日付とタグの間にマージン
                        mr: { xs: 0, sm: 3 }, // モバイルでは余白なし、PCでは余白を追加
                      }}
                    >
                      {new Date(news.date.toDate()).toLocaleDateString(
                        "ja-JP",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )}
                    </Typography>
                  </CustomEffect>
                  <CustomEffect>
                    <Chip
                      label={news.tag}
                      variant="outlined"
                      size="small"
                      sx={{
                        fontSize: { xs: "8px", sm: "10px" },
                        minWidth: "80px",
                        whiteSpace: "nowrap", // 折り返しを防止
                        mr: { xs: 0, sm: 2 }, // モバイルでは余白なし、PCでは余白を追加
                        ml: { xs: 1, sm: 1 },
                        mb: { xs: 1, sm: 0 },
                      }}
                    />
                  </CustomEffect>
                </Grid>

                {/* タイトルの表示 */}
                <Grid item xs={12} md={5}>
                  <CustomEffect>
                    <Typography
                      sx={{
                        textAlign: { xs: "center", md: "left" }, // モバイルで中央寄せ
                        fontSize: { xs: "10px", sm: "12px" },
                        minWidth: "120px",
                        ml: { xs: 0, sm: 2 },
                        whiteSpace: "nowrap", // 折り返しを防止
                        overflow: "hidden", // 溢れたテキストを隠す
                        textOverflow: "ellipsis", // 溢れたテキストを省略記号に置き換える
                      }}
                    >
                      {news.title}
                    </Typography>
                  </CustomEffect>
                </Grid>
              </Grid>
            ))}

            {/* プレースホルダー行を追加して高さを維持 */}
            {Array.from({ length: placeholderCount }).map((_, idx) => (
              <Grid
                container
                key={`placeholder-${idx}`}
                sx={{
                  padding: "8px 0",
                  alignItems: "center",
                  minWidth: "300px", // 最小幅を各ニュース行に設定
                  height: "60px", // 各行の高さを固定
                  opacity: 0, // プレースホルダーを見えなくする
                }}
              />
            ))}
          </Box>
        </Box>
      </CustomEffect>
    </Box>
  );
};

export default NewsSection;
