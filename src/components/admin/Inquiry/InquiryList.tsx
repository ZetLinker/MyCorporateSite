import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  SelectChangeEvent,
} from "@mui/material";
import SidebarToggleButton from "../shared/SidebarToggleButton";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../../firebase-config"; // Firebaseアプリのインスタンスをインポート
import { useSidebar } from "../shared/SidebarContext"; // useSidebarをインポート

const inquiryLabels = {
  問い合わせ: "問い合わせ",
  見積り依頼: "見積り依頼",
  資料請求: "資料請求",
  その他: "その他",
};

const InquiryList: React.FC = () => {
  const { isOpen, sidebarWidth } = useSidebar(); // isOpenとsidebarWidthを取得
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1); // 現在のページ番号
  const itemsPerPage = 5; // 1ページに表示するアイテム数

  useEffect(() => {
    const fetchInquiries = async () => {
      const db = getFirestore(app);
      const q = query(collection(db, "contact"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const inquiriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInquiries(inquiriesData);
    };

    fetchInquiries();
  }, []);

  const handleCompleteClick = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedInquiry(null);
  };

  const handleDialogConfirm = async () => {
    if (selectedInquiry) {
      const db = getFirestore(app);
      const inquiryRef = doc(db, "contact", selectedInquiry.id);
      await updateDoc(inquiryRef, { completed: true });

      setInquiries((prevInquiries) =>
        prevInquiries.map((inquiry) =>
          inquiry.id === selectedInquiry.id
            ? { ...inquiry, completed: true }
            : inquiry
        )
      );
    }
    setOpenDialog(false);
    setSelectedInquiry(null);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value as string);
    setPage(1); // フィルター変更時にページをリセット
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    if (filter === "completed") return inquiry.completed;
    if (filter === "notCompleted") return !inquiry.completed;
    return true;
  });

  // ページネーションのための問い合わせリストの分割
  const paginatedInquiries = filteredInquiries.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);

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
          問い合わせ一覧
        </Typography>
        <FormControl sx={{ mb: 3, minWidth: 120 }}>
          <InputLabel id="filter-label">フィルター</InputLabel>
          <Select
            labelId="filter-label"
            value={filter}
            onChange={handleFilterChange}
            label="フィルター"
          >
            <MenuItem value="all">全て</MenuItem>
            <MenuItem value="completed">対応済み</MenuItem>
            <MenuItem value="notCompleted">未対応</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{ display: "flex", justifyContent: "center", mb: 1 }}
        />
        {paginatedInquiries.length === 0 ? (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", mt: "clamp(2rem, 4vw, 4rem)" }}
          >
            お問い合わせ件数が0件です。
          </Typography>
        ) : (
          <List>
            {paginatedInquiries.map((inquiry) => (
              <Paper
                key={inquiry.id}
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                elevation={0} // 影を無くすために追加
              >
                <ListItem>
                  <ListItemText
                    primary={`件名: ${inquiry.subject}`}
                    secondary={
                      <>
                        <Typography variant="body2">
                          名前: {inquiry.name}
                        </Typography>
                        <Typography variant="body2">
                          会社名: {inquiry.company}
                        </Typography>
                        <Typography variant="body2">
                          メール: {inquiry.email}
                        </Typography>
                        <Typography variant="body2">
                          電話番号: {inquiry.tel}
                        </Typography>
                        <Typography variant="body2">
                          問い合わせ内容: {inquiry.message}
                        </Typography>
                        <Typography variant="body2">
                          問い合わせタイプ:{" "}
                          {inquiry.inquiryType
                            .split(", ")
                            .map((type: string) => inquiryLabels[type])
                            .join(", ")}
                        </Typography>
                        <Typography variant="body2">
                          お問い合わせ時間:{" "}
                          {new Date(
                            inquiry.timestamp.seconds * 1000
                          ).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                  {inquiry.completed ? (
                    <Typography variant="body2" color="green">
                      対応済み✔️
                    </Typography>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCompleteClick(inquiry)}
                    >
                      対応済みにする
                    </Button>
                  )}
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{ display: "flex", justifyContent: "center", mt: 1 }}
        />
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"お問い合わせ対応確認"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            この操作は取り消せません。問い合わせを対応完了しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleDialogConfirm} color="primary" autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InquiryList;
