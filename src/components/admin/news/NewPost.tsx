import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"; // Timestampをインポート
import { db, storage } from "../../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { useSidebar } from "../shared/SidebarContext";
import SidebarToggleButton from "../shared/SidebarToggleButton";
import { useNavigate } from "react-router-dom";
import MainEditor from "../shared/MainEditor"; // MainEditorをインポート

const TAG_OPTIONS = ["お知らせ", "実績", "イベント"] as const;
type TagOption = (typeof TAG_OPTIONS)[number];

const DISPLAY_OPTIONS = [
  { value: true, label: "表示する" },
  { value: false, label: "表示しない" },
];

const NewPost: React.FC = () => {
  const [title, setTitle] = useState(sessionStorage.getItem("title") || "");
  const [content, setContent] = useState(
    sessionStorage.getItem("content") || ""
  ); // Content state is managed for TipTap
  const [date, setDate] = useState(sessionStorage.getItem("date") || "");
  const [isDisplay, setIsDisplay] = useState(
    sessionStorage.getItem("isDisplay") === "false" ? false : true
  );
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [tag, setTag] = useState<TagOption>(
    (sessionStorage.getItem("tag") as TagOption) || "お知らせ"
  );
  const [errors, setErrors] = useState({ date: "", title: "", content: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const { isOpen, sidebarWidth } = useSidebar();
  const navigate = useNavigate();

  // 追加: lastPosition と setLastPosition の定義
  const [lastPosition, setLastPosition] = useState<{
    top: number;
    height: number;
  }>({
    top: 11.0,
    height: 0,
  });

  useEffect(() => {
    sessionStorage.setItem("title", title);
    sessionStorage.setItem("content", content);
    sessionStorage.setItem("date", date);
    sessionStorage.setItem("isDisplay", isDisplay.toString());
    sessionStorage.setItem("tag", tag);
  }, [title, content, date, isDisplay, tag]);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const validate = (isDraft: boolean) => {
    const newErrors = { date: "", title: "", content: "" };

    if (!date) newErrors.date = "公開日時を入力してください";

    if (!title) {
      newErrors.title = "タイトルを入力してください";
    } else if (title.length > 30) {
      newErrors.title = "タイトルは30文字以内で入力してください";
    }

    // HTML タグを除去して内容をチェック
    const plainText = stripHtml(content).trim();
    if (!plainText) {
      newErrors.content = "内容を入力してください";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleAddNews = async (isDraft = false) => {
    if (!validate(isDraft)) {
      setSnackbarMessage("入力内容にエラーがあります。");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const auth = getAuth();
    const createdBy = auth.currentUser ? auth.currentUser.uid : "unknown_user";
    let uploadedImageUrl = "";

    if (image) {
      const imageRef = ref(
        storage,
        `news/${createdBy}-${new Date().toISOString()}`
      );
      try {
        await uploadBytes(imageRef, image);
        uploadedImageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        console.error("ファイルのアップロードに失敗しました:", error);
        setSnackbarMessage("ファイルのアップロードに失敗しました。");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
    }

    // 追加: `date` を Timestamp 型に変換
    const newsDate = Timestamp.fromDate(new Date(date));

    const newsData: any = {
      title,
      content,
      date: newsDate, // 修正: Timestamp を使用
      imageUrl: uploadedImageUrl,
      isDisplay: isDraft ? false : isDisplay,
      isDelete: false,
      tag,
      isDraft,
    };

    if (isDraft) {
      newsData.draftBy = createdBy;
      newsData.draftAt = serverTimestamp();
    } else {
      newsData.createdBy = createdBy;
      newsData.createdAt = serverTimestamp();
    }

    try {
      await addDoc(collection(db, "news"), newsData);
      setSnackbarMessage(
        isDraft
          ? "下書きが正常に保存されました。"
          : "お知らせが正常に追加されました。"
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      resetForm();
      if (!isDraft) {
        sessionStorage.clear();
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      setSnackbarMessage(
        isDraft
          ? "下書きの保存に失敗しました。"
          : "お知らせの追加に失敗しました。"
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setDate("");
    setImage(null);
    setImagePreviewUrl(null);
    setIsDisplay(true);
    setTag("お知らせ");
    // 縦ラインの高さをリセット
    setLastPosition({ top: 11.0, height: 0 });
  };

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
        <Typography
          variant="h4"
          sx={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", mb: 5 }}
        >
          新規記事投稿
        </Typography>
        <TextField
          label="公開日時"
          type="datetime-local"
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{
            shrink: true,
            sx: { fontSize: { xs: 12, sm: 14 } },
          }}
          InputProps={{
            sx: { fontSize: { xs: 12, sm: 14 } },
          }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          error={!!errors.date}
          helperText={errors.date}
          inputProps={{ min: getCurrentDateTime() }}
        />
        <TextField
          label="タイトル"
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{
            sx: { fontSize: { xs: 12, sm: 14 } },
          }}
          InputProps={{
            sx: { fontSize: { xs: 12, sm: 14 } },
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          error={!!errors.title}
          helperText={errors.title}
          inputProps={{ maxLength: 30 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel
            id="tag-label"
            shrink
            sx={{
              fontSize: { xs: 12, sm: 14 },
              backgroundColor: "white",
              px: 1,
              left: -5,
            }}
          >
            分類タグ
          </InputLabel>
          <Select
            labelId="tag-label"
            value={tag}
            onChange={(e) => setTag(e.target.value as TagOption)}
            sx={{ fontSize: { xs: 12, sm: 14 } }}
          >
            {TAG_OPTIONS.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{ fontSize: { xs: 12, sm: 14 } }}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel
            id="display-label"
            shrink
            sx={{
              fontSize: { xs: 12, sm: 14 },
              backgroundColor: "white",
              px: 1,
              left: -5,
            }}
          >
            表示設定
          </InputLabel>
          <Select
            labelId="display-label"
            value={isDisplay}
            onChange={(e) => setIsDisplay(e.target.value === "true")}
            sx={{ fontSize: { xs: 12, sm: 14 } }}
          >
            {DISPLAY_OPTIONS.map((option) => (
              <MenuItem
                key={option.value.toString()}
                value={option.value.toString()}
                sx={{ fontSize: { xs: 12, sm: 14 } }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <MainEditor
          content={content}
          setContent={setContent}
          error={errors.content}
        />

        {/* contentとsetContentを渡す */}
        <Box
          sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleAddNews(true)}
          >
            下書き保存
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddNews(false)}
          >
            送信
          </Button>
        </Box>
      </Box>
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

export default NewPost;
