import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Snackbar,
  Alert,
  List,
  ListItem,
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
import { getAuth } from "firebase/auth"; // Firebase Authenticationのインポート

// Define the DraftItem type
type DraftItem = {
  id: string;
  title: string;
  draftAt: Timestamp; // draftAtをTimestamp型に変更
  isDraft: boolean;
  isDelete: boolean; // isDeleteを追加
  draftBy: string; // draftByを追加
};

const Drafts: React.FC = () => {
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const { isOpen, sidebarWidth } = useSidebar();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // Firebase Authenticationから現在のユーザーIDを取得
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const userId = currentUser ? currentUser.uid : null;

  // Firebase Firestoreから下書きを取得
  useEffect(() => {
    const fetchDrafts = async () => {
      if (!userId) return; // ユーザーIDが取得できない場合は処理を中断

      try {
        const q = query(
          collection(db, "news"),
          where("isDraft", "==", true),
          where("isDelete", "==", false), // isDeleteがfalseであることを追加
          where("draftBy", "==", userId), // 自分のユーザーIDに限定
          orderBy("draftAt", "desc") // draftAtでソート
        );
        const querySnapshot = await getDocs(q);
        const draftsData: DraftItem[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<DraftItem, "id">),
          id: doc.id,
        }));
        setDrafts(draftsData);
      } catch (error) {
        console.error("下書きの取得に失敗しました:", error);
        setSnackbarMessage("下書きの取得に失敗しました。");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };
    fetchDrafts();
  }, [userId]);

  // 下書きの削除
  const handleDeleteDraft = async (id: string) => {
    try {
      // ローカルの状態から下書きを削除
      setDrafts((prevDrafts) => prevDrafts.filter((draft) => draft.id !== id));

      // Firestoreのドキュメントを更新
      const draftDoc = doc(db, "news", id);
      await updateDoc(draftDoc, { isDraft: false });

      setSnackbarMessage("下書きが削除されました。");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("下書きの削除に失敗しました:", error);
      setSnackbarMessage("下書きの削除に失敗しました。");
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
        <Typography
          variant="h4"
          sx={{
            fontSize: "clamp(1.5rem, 3vw, 3rem)", // フォントサイズをclampで設定
            mb: 5,
          }}
        >
          下書き一覧
        </Typography>
        {drafts.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", mt: 5 }}>
            下書きは0件です。記事を書きましょう！
          </Typography>
        ) : (
          <List>
            {drafts.map((draft) => (
              <ListItem
                key={draft.id}
                sx={{
                  mb: "clamp(1rem, 2vw, 2rem)", // マージンボトムを調整
                  border: "1px solid #ccc",
                  padding: "clamp(1rem, 2vw, 2rem)", // パディングをclampで設定
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={2}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
                        color: "gray",
                      }}
                    >
                      保存日時:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
                    >
                      {draft.draftAt.toDate().toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                      {draft.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mb: 1, mr: 1 }}
                      onClick={() => navigate(`/admin/news/detail/${draft.id}`)}
                    >
                      詳細
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mb: 1, mr: 1 }}
                      onClick={() => navigate(`/admin/news/edit/${draft.id}`)}
                    >
                      編集
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ mb: 1, backgroundColor: "#D3D3D3" }}
                      onClick={() => handleDeleteDraft(draft.id)}
                    >
                      削除
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        )}
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

export default Drafts;
