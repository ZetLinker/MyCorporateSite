import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  OutlinedInput,
  Pagination,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  collection,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useSidebar } from "../shared/SidebarContext";
import SidebarToggleButton from "../shared/SidebarToggleButton";

// Define the NewsItem type
type NewsItem = {
  id: string;
  title: string;
  date: Timestamp; // dateをTimestamp型に変更
  isDisplay: boolean;
  isDelete: boolean;
  tag: "お知らせ" | "実績" | "イベント";
};

const ListView: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [sortTag, setSortTag] = useState<SortTagOption>("全て");
  const [page, setPage] = useState(1); // 現在のページ番号
  const itemsPerPage = 5; // 1ページに表示するアイテム数
  const { isOpen, sidebarWidth } = useSidebar();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // Firebase Firestoreからお知らせを取得
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(
          collection(db, "news"),
          where("isDelete", "==", false),
          where("isDraft", "==", false),
          orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        const newsData: NewsItem[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<NewsItem, "id">),
          id: doc.id,
        }));
        setNewsList(newsData);
      } catch (error) {
        console.error("お知らせの取得に失敗しました:", error);
        setSnackbarMessage("お知らせの取得に失敗しました。");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };
    fetchNews();
  }, []);

  // お知らせの表示/非表示トグル
  const handleToggleDisplay = async (
    id: string,
    currentDisplayStatus: boolean
  ) => {
    try {
      const newsDoc = doc(db, "news", id);
      await updateDoc(newsDoc, { isDisplay: !currentDisplayStatus });

      // ローカルの状態を更新
      setNewsList((prevNewsList) =>
        prevNewsList.map((news) =>
          news.id === id ? { ...news, isDisplay: !currentDisplayStatus } : news
        )
      );

      setSnackbarMessage(
        !currentDisplayStatus
          ? "お知らせを表示しました。"
          : "お知らせを非表示にしました。"
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("お知らせの表示/非表示の更新に失敗しました:", error);
      setSnackbarMessage("お知らせの表示/非表示の更新に失敗しました。");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // お知らせの論理削除
  const handleDeleteNews = async (id: string) => {
    try {
      // ローカルの状態からお知らせを削除
      setNewsList((prevNewsList) =>
        prevNewsList.filter((news) => news.id !== id)
      );

      // Firestoreのドキュメントを更新
      const newsDoc = doc(db, "news", id);
      await updateDoc(newsDoc, { isDelete: true });

      setSnackbarMessage("お知らせが削除されました。");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("お知らせの削除に失敗しました:", error);
      setSnackbarMessage("お知らせの削除に失敗しました。");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // タグの選択肢を定数定義
  const TAG_OPTIONS = ["お知らせ", "実績", "イベント"] as const;
  type TagOption = (typeof TAG_OPTIONS)[number];
  type SortTagOption = "全て" | TagOption;

  interface TagSelectProps {
    value: TagOption | SortTagOption;
    onChange: (value: TagOption | SortTagOption) => void;
    label: string;
    includeAll?: boolean;
    fullWidth?: boolean;
  }

  // タグ共通のセレクトコンポーネント
  const TagSelect: React.FC<TagSelectProps> = ({
    value,
    onChange,
    label,
    includeAll = false,
    fullWidth = false,
  }) => (
    <FormControl
      fullWidth={fullWidth}
      sx={{ mb: 2, minWidth: 120, width: "200px" }}
    >
      <InputLabel id={`${label}-label`} shrink>
        {label}
      </InputLabel>
      <Select
        labelId={`${label}-label`}
        value={value}
        onChange={(e) => onChange(e.target.value as TagOption | SortTagOption)}
        input={<OutlinedInput notched label={label} />}
      >
        {includeAll && <MenuItem value="全て">全て</MenuItem>}
        {TAG_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  // タグハンドラー定義
  const handleSortTagChange = (newSortTag: SortTagOption) => {
    setSortTag(newSortTag);
    setPage(1); // ページをリセット
  };

  // タグに基づくフィルタリング
  const filteredNewsList =
    sortTag === "全て"
      ? newsList
      : newsList.filter((news) => news.tag === sortTag);

  // ページネーションのためのニュースリストの分割
  const paginatedNewsList = filteredNewsList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredNewsList.length / itemsPerPage);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        p: 3,
        mt: 5,
        marginLeft: { sm: isOpen ? sidebarWidth : 0 },
        transition: "margin-left 0.6s ease",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "80%" },
          mx: "auto",
        }}
      >
        <SidebarToggleButton />
        <Typography variant="h4" sx={{ mb: 3 }}>
          お知らせ一覧
        </Typography>

        <TagSelect
          value={sortTag}
          onChange={handleSortTagChange}
          label="タグ検索"
          includeAll
        />
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 2 }}
        />
        <Box sx={{ mb: "clamp(1rem, 2vw, 2rem)" }}>
          {/* お知らせがない場合のメッセージ */}
          {paginatedNewsList.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", mt: "clamp(2rem, 4vw, 4rem)" }}
            >
              現在、お知らせは投稿されておりません。
            </Typography>
          ) : (
            paginatedNewsList.map((news) => (
              <Grid
                container
                alignItems="center"
                key={news.id}
                sx={{
                  mb: "clamp(1rem, 2vw, 2rem)", // マージンボトムを調整
                  border: "1px solid #ccc",
                  padding: "clamp(1rem, 2vw, 2rem)", // パディングをclampで設定
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Grid item xs={12} sm={2}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
                      color: "gray",
                    }}
                  >
                    表示日時:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
                  >
                    {news.date.toDate().toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
                      color: "gray",
                    }}
                  >
                    タグ:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
                  >
                    {news.tag}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
                      color: "gray",
                    }}
                  >
                    タイトル:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
                  >
                    {news.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
                      color: "gray",
                    }}
                  >
                    ステータス:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)", ml: 2 }}
                  >
                    {news.isDisplay
                      ? news.date.toDate() > new Date()
                        ? "表示予定"
                        : "表示"
                      : "非表示"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 1, mr: 1 }}
                    onClick={() => navigate(`/admin/news/detail/${news.id}`)}
                  >
                    詳細
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 1, mr: 1 }}
                    onClick={() => navigate(`/admin/news/edit/${news.id}`)}
                  >
                    編集
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mb: 1, mr: 1, minWidth: "74px" }} // ボタンの幅を固定
                    onClick={() => handleToggleDisplay(news.id, news.isDisplay)}
                  >
                    {news.isDisplay ? "非表示" : "表示"}
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ mb: 1, backgroundColor: "#D3D3D3" }}
                    onClick={() => handleDeleteNews(news.id)}
                  >
                    削除
                  </Button>
                </Grid>
              </Grid>
            ))
          )}
        </Box>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{ display: "flex", justifyContent: "center", mt: 3 }}
        />
      </Box>
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ListView;
