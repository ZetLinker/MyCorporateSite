import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config"; // Firebaseのauth設定をインポート
import { useAuth } from "./AuthContext"; // 認証コンテキストをインポート

// LogoutButtonコンポーネント
const LogoutButton: React.FC = () => {
  const navigate = useNavigate(); // ルーティング用のフック
  const { setUser } = useAuth(); // 認証コンテキストからsetUserを取得

  // ログアウト処理を行う関数
  const handleLogout = async () => {
    try {
      // Firebase認証からサインアウト
      await signOut(auth);

      // ユーザー情報をクリア
      setUser(null);

      // ローカルストレージから認証情報を削除
      localStorage.removeItem("isAuthenticated");

      // ログアウト成功後、ログインページにリダイレクト
      navigate("/login");
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
      alert("ログアウトに失敗しました。再試行してください。");
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleLogout}
      sx={{
        mt: 2,
        width: "100%",
        bgcolor: "primary.main",
        "&:hover": {
          bgcolor: "primary.dark",
        },
      }}
    >
      ログアウト
    </Button>
  );
};

export default LogoutButton;
