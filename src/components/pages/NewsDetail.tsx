import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, Timestamp } from "firebase/firestore";
import { Box, Typography } from "@mui/material";
import CustomRectangle from "../util/CustomRectangle";
import NewsContent from "./shared/NewsContent";
import Footer from "../Footer";

type NewsItem = {
  id: string;
  date: Timestamp; // dateをTimestamp型に変更
  tag: "お知らせ" | "実績" | "イベント";
  title: string;
  content: string;
  isDelete: boolean;
  isDisplay: boolean;
  isDraft: boolean;
};

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, "news", id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNewsItem({ id: docSnap.id, ...docSnap.data() } as NewsItem);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching news detail:", error);
      }
    };
    fetchNewsDetail();
  }, [id]);

  if (!newsItem) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3, position: "relative" }}>
      <CustomRectangle
        color={true}
        zIndex={49}
        direction={true}
        sx={{
          marginTop: "100px", // 上から100pxの位置に表示
          marginLeft: { xs: "-10%", sm: "-5%" },
          width: { xs: "80%", sm: "50%", md: "50%" },
          height: { xs: "100px", sm: "100px", md: "100px" },
        }}
      />
      <NewsContent newsItem={newsItem} />
      <CustomRectangle
        color={false}
        zIndex={49}
        direction={false}
        sx={{
          marginTop: "50px", // 下に50pxのマージンを追加
          marginLeft: "auto", // 右寄せ
          marginRight: { xs: "-10%", sm: "-5%" }, // モバイルで-10%、PCで-5%
          mb: 10,
          width: { xs: "80%", sm: "50%", md: "50%" },
          height: { xs: "100px", sm: "100px", md: "100px" },
        }}
      />
      <Footer />
    </Box>
  );
};

export default NewsDetail;
