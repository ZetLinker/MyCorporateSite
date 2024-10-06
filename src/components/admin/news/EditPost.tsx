import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  Timestamp,
  serverTimestamp,
  FieldValue,
} from "firebase/firestore"; // FieldValue を追加
import { db, storage } from "../../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSidebar } from "../shared/SidebarContext";
import SidebarToggleButton from "../shared/SidebarToggleButton";
import { useAuth } from "../shared/AuthContext";
import MainEditor from "../shared/MainEditor"; // MainEditorをインポート

type NewsItem = {
  id: string;
  title: string;
  content: string;
  date: Timestamp;
  imageUrl: string;
  isDisplay: boolean;
  isDelete: boolean;
  tag: "お知らせ" | "実績" | "イベント";
  lastEditedBy: string;
  lastEditedAt: string;
  isDraft?: boolean;
  draftBy?: string;
  draftAt?: Timestamp | FieldValue;
  createdBy?: string;
  createdAt?: Timestamp | FieldValue;
};

const TAG_OPTIONS = ["お知らせ", "実績", "イベント"] as const;
type TagOption = (typeof TAG_OPTIONS)[number];

const DISPLAY_OPTIONS = [
  { value: true, label: "表示する" },
  { value: false, label: "表示しない" },
];

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // コンテンツの状態管理
  const [date, setDate] = useState("");
  const [isDisplay, setIsDisplay] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [tag, setTag] = useState<TagOption>("お知らせ");
  const [errors, setErrors] = useState({ date: "", title: "", content: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const { isOpen, sidebarWidth } = useSidebar();
  const navigate = useNavigate();
  const [lastEditedBy, setLastEditedBy] = useState<string | null>(null);
  const [lastEditedAt, setLastEditedAt] = useState<string | null>(null);
  const [isDraft, setIsDraft] = useState(false); // isDraftの状態管理

  // getCurrentDateTime 関数を定義
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchNews = async () => {
      if (id) {
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as NewsItem;
          setTitle(data.title);
          setContent(data.content);
          setDate(
            data.date.toDate().toISOString().split("T")[0] +
              "T" +
              data.date.toDate().toTimeString().slice(0, 5)
          ); // TimestampをISO文字列に変換
          setIsDisplay(data.isDisplay);
          setTag(data.tag);
          setImagePreviewUrl(data.imageUrl);
          setLastEditedBy(data.lastEditedBy);
          setLastEditedAt(data.lastEditedAt);
          setIsDraft(data.isDraft || false); // isDraftの状態を設定
        } else {
          alert("お知らせが見つかりません。");
          navigate("/admin");
        }
      }
    };
    fetchNews();
  }, [id, navigate]);

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const validate = (isDraft: boolean) => {
    const newErrors = { date: "", title: "", content: "" };

    const currentDate = new Date();
    const selectedDate = new Date(date);

    // 公開日時が現在時刻より過去である場合のバリデーション
    if (selectedDate < currentDate) {
      newErrors.date = "公開日時は現在時刻より未来に設定してください";
    }

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

  const handleUpdateNews = async (isDraft: boolean) => {
    if (!id) return;

    if (validate(isDraft)) {
      const userId = user?.email || "unknown_user";
      let uploadedImageUrl = imagePreviewUrl || "";

      if (image) {
        const imageRef = ref(
          storage,
          `news/${userId}-${new Date().toISOString()}`
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

      const newsDoc = doc(db, "news", id);
      const updateData: Partial<NewsItem> = {
        title,
        content,
        date: Timestamp.fromDate(new Date(date)), // ISO文字列をTimestampに変換
        tag,
        imageUrl: uploadedImageUrl,
        lastEditedBy: userId,
        lastEditedAt: new Date().toISOString(),
      };

      if (isDraft) {
        updateData.isDisplay = false; // 下書き保存時は表示設定を非表示に
        updateData.isDraft = true; // 下書き保存フラグを設定
        updateData.draftBy = userId;
        updateData.draftAt = serverTimestamp();
      } else {
        updateData.isDisplay = isDisplay;
        updateData.isDraft = false;
        updateData.createdBy = userId;
        updateData.createdAt = serverTimestamp();
      }

      try {
        await updateDoc(newsDoc, updateData);
        setSnackbarMessage(
          isDraft
            ? "下書きが正常に保存されました。"
            : "お知らせが正常に更新されました。"
        );
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        if (!isDraft) {
          navigate("/admin/news/list");
        }
      } catch (error) {
        console.error("エラーが発生しました:", error);
        setSnackbarMessage(
          isDraft
            ? "下書きの保存に失敗しました。"
            : "お知らせの更新に失敗しました。"
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("入力内容にエラーがあります。");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
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
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "center", sm: "flex-start" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", mb: 5 }}
          >
            {isDraft ? "下書き編集" : "お知らせ編集"}
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 2,
              flexDirection: "row",
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(-1)}
              sx={{ mt: { sm: 2 } }}
            >
              戻る
            </Button>
          </Box>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="公開日時"
            type="datetime-local"
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            error={!!errors.date}
            helperText={errors.date}
            inputProps={{ min: getCurrentDateTime() }}
            FormHelperTextProps={{
              sx: { color: "red", opacity: 0.7 },
            }}
          />
          <TextField
            label="タイトル"
            fullWidth
            sx={{ mb: 2 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            error={!!errors.title}
            helperText={errors.title}
            inputProps={{
              maxLength: 30,
            }}
            FormHelperTextProps={{
              sx: { color: "red", opacity: 0.7 },
            }}
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
          {imagePreviewUrl && (
            <Box>
              <Box
                component="img"
                src={imagePreviewUrl}
                alt="Preview"
                sx={{
                  width: { xs: "100%", sm: 400 },
                  height: "auto",
                  mb: 2,
                  borderRadius: 2,
                }}
              />
            </Box>
          )}
          <MainEditor
            content={content}
            setContent={setContent}
            error={errors.content} // バリデーションエラーメッセージを渡す
          />
          {/* MainEditorにcontentとonChangeを渡す */}
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateNews(false)} // 公開保存
            >
              {isDraft ? "公開" : "保存"}
            </Button>
            {isDraft && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleUpdateNews(true)} // 下書き保存
              >
                下書き保存
              </Button>
            )}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(-1)}
            >
              キャンセル
            </Button>
          </Box>
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

export default EditPost;
