import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, Timestamp } from "firebase/firestore";
import { Box, Typography, Button } from "@mui/material";
import CustomRectangle from "../../util/CustomRectangle";
import NewsContent from "../../pages/shared/NewsContent";
import SidebarToggleButton from "../shared/SidebarToggleButton";

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

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
      <SidebarToggleButton />
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          onClick={() => navigate(-1)} // 前のページに戻る
        >
          戻る
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(`/admin/news/edit/${id}`)} // 編集ページに遷移
        >
          編集
        </Button>
      </Box>
    </Box>
  );
};

export default Detail;
