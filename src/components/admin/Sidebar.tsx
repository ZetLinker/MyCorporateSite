import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Typography,
  Avatar,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutButton from "./shared/LogoutButton";
import { useAuth } from "./shared/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { auth } from "../../firebase-config"; // firebase-configのパスを適切に調整してください
import { onAuthStateChanged } from "firebase/auth";
import { useSidebar } from "./shared/SidebarContext"; // SidebarContextを使用
import adminLogo from "../../assets/admin_logo.svg";
import logo from "../../assets/logo.svg";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [newsOpen, setNewsOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false); // 問い合わせの状態を追加
  const { isOpen, toggleSidebar, sidebarWidth } = useSidebar(); // sidebarWidthを取得
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // モバイル時のサイドバーの初期状態を設定
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setOpen(false); // モバイル時はサイドバーを閉じる
      } else {
        setOpen(true); // デスクトップ時はサイドバーを開く
      }
    };

    handleResize(); // 初期状態を設定
    window.addEventListener("resize", handleResize); // リサイズイベントを監視

    return () => {
      window.removeEventListener("resize", handleResize); // クリーンアップ
    };
  }, []);

  useEffect(() => {
    // Firebase Authの状態変更を監視して、ユーザー情報を取得
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({ email: currentUser.email || "" });
      } else {
        setUser(null); // ユーザーがいない場合はnullをセット
      }
    });

    // クリーンアップ関数で監視を解除
    return () => unsubscribe();
  }, [setUser]);

  const toggleNews = () => {
    setNewsOpen(!newsOpen);
  };

  const toggleInquiry = () => {
    setInquiryOpen(!inquiryOpen);
  };

  return (
    <>
      {/* モバイル用のナビゲーションバー */}
      <AppBar
        position="static"
        sx={{ display: { xs: "block", sm: "none" } }}
      ></AppBar>

      {/* サイドバーをSwipeableDrawerに変更 */}
      <SwipeableDrawer
        variant="temporary" // モバイル用の一時的なドロワー
        anchor="left"
        open={isOpen}
        onClose={toggleSidebar} // 閉じる処理
        onOpen={toggleSidebar} // 開く処理
        PaperProps={{
          sx: {
            width: sidebarWidth, // sidebarWidthを使用してサイドバーの幅を設定
            background: "transparent",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgb(70, 70, 70), hsla(0, 2.70%, 7.30%, 0.86))",
            filter: "blur(1px)",
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* ロゴとテキストを横並びに配置 */}
            <img
              src={logo} // ロゴのパスを正しいものに変更してください
              alt="Admin Logo"
              style={{ width: "20px", marginRight: "8px" }} // ロゴのサイズと余白を調整
            />
            <Typography
              variant="h5"
              component={RouterLink}
              to="admin/dashboard" // 管理者ページの遷移先を変更
              sx={{
                textDecoration: "none",
                fontSize: { xs: "14px", sm: "18px" },
                fontWeight: "bold",
                color: "white",
                letterSpacing: {
                  xs: "0.05em",
                  sm: "0.05em",
                },
              }}
              onClick={toggleSidebar} // リンククリック時にサイドバーを閉じる
            >
              管理者ページ
            </Typography>
          </Box>
        </Box>

        <Box sx={{ padding: 2, textAlign: "left", color: "white" }}>
          <Box sx={{ textAlign: "left" }}>
            <Avatar sx={{ width: 32, height: 32, mb: 2 }}>
              {user?.email.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
              {user?.email}
            </Typography>
          </Box>
          <LogoutButton />
        </Box>

        <List sx={{ color: "white" }}>
          {/* ダッシュボードリンク */}
          <ListItem
            button
            component={RouterLink}
            to="admin/dashboard" // ダッシュボードの遷移先
            onClick={toggleSidebar} // クリック時にサイドバーを閉じる
          >
            <ListItemText
              primary="ダッシュボード"
              primaryTypographyProps={{
                sx: {
                  fontSize: { xs: "12px", sm: "14px" },
                  fontWeight: "bold",
                  color: "white",
                },
              }}
            />
          </ListItem>
          {/* NEWSセクション */}
          <ListItem onClick={toggleNews}>
            <ListItemText
              primary="ニュース"
              primaryTypographyProps={{
                sx: {
                  fontSize: { xs: "12px", sm: "14px" },
                  fontWeight: "bold",
                  color: "white",
                },
              }}
            />
            {newsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={newsOpen} timeout={300} unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                component={RouterLink}
                to="news/list"
                key="list"
                onClick={toggleSidebar} // クリック時にサイドバーを閉じる
              >
                <ListItemText
                  primary="- 一覧管理"
                  primaryTypographyProps={{
                    sx: {
                      fontSize: { xs: "10px", sm: "12px" }, // 親のサイズから-2px
                      fontWeight: "normal",
                      color: "white",
                    },
                  }}
                />
              </ListItem>
              <ListItem
                component={RouterLink}
                to="news/post"
                key="post"
                onClick={toggleSidebar} // クリック時にサイドバーを閉じる
              >
                <ListItemText
                  primary="- 新規投稿"
                  primaryTypographyProps={{
                    sx: {
                      fontSize: { xs: "10px", sm: "12px" }, // 親のサイズから-2px
                      fontWeight: "normal",
                      color: "white",
                    },
                  }}
                />
              </ListItem>
              <ListItem
                component={RouterLink}
                to="news/drafts"
                key="drafts"
                onClick={toggleSidebar} // クリック時にサイドバーを閉じる
              >
                <ListItemText
                  primary="- 下書き一覧"
                  primaryTypographyProps={{
                    sx: {
                      fontSize: { xs: "10px", sm: "12px" }, // 親のサイズから-2px
                      fontWeight: "normal",
                      color: "white",
                    },
                  }}
                />
              </ListItem>
            </List>
          </Collapse>
          {/* 問い合わせ管理セクション */}
          <ListItem onClick={toggleInquiry}>
            <ListItemText
              primary="問い合わせ"
              primaryTypographyProps={{
                sx: {
                  fontSize: { xs: "12px", sm: "14px" },
                  fontWeight: "bold",
                  color: "white",
                },
              }}
            />
            {inquiryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={inquiryOpen} timeout={300} unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                component={RouterLink}
                to="inquiry/list"
                key="inquiry-list"
                onClick={toggleSidebar} // クリック時にサイドバーを閉じる
              >
                <ListItemText
                  primary="- 一覧管理"
                  primaryTypographyProps={{
                    sx: {
                      fontSize: { xs: "10px", sm: "12px" }, // 親のサイズから-2px
                      fontWeight: "normal",
                      color: "white",
                    },
                  }}
                />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            mt: "auto", // スペースを自動で埋める
            borderTop: "1px solid rgba(255, 255, 255, 0.1)", // 上部に区切り線を追加
          }}
        >
          <img
            src={adminLogo} // ロゴのパスを正しいものに変更してください
            alt="Zet Linker Logo"
            style={{ width: "16px", marginRight: "8px" }}
          />
          <Typography
            sx={{
              fontSize: { xs: "8px", sm: "10px" },
              fontWeight: "bold",
              color: "white",
            }}
          >
            Zet Linker
          </Typography>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default Sidebar;
