import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { auth, signInWithEmailAndPassword } from "../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../admin/shared/AuthContext";
import logo from "../../assets/logo.svg";
import { FirebaseError } from "firebase/app";
import CircularProgress from "@mui/material/CircularProgress";

// Loginコンポーネント
const Login: React.FC = () => {
  // ユーザー名、パスワード、エラーメッセージ、ローディング状態を管理するための状態
  const [username, setUsername] = useState(""); // ユーザー名の状態
  const [password, setPassword] = useState(""); // パスワードの状態
  const [error, setError] = useState<string | null>(null); // エラーメッセージの状態
  const [isLoading, setIsLoading] = useState(false); // ローディング状態

  const navigate = useNavigate(); // ルーティング用のフック
  const [user] = useAuthState(auth); // Firebase認証状態のフック
  const { setUser } = useAuth(); // 認証コンテキストからsetUserを取得

  // ユーザーがログインしている場合、管理画面にリダイレクト
  useEffect(() => {
    if (user) {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  // ログイン処理を行う関数
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルトの送信を防ぐ

    // ユーザー名とパスワードが空でないかを確認
    if (username.trim() === "" || password.trim() === "") {
      setError("ユーザー名とパスワードを入力してください。");
      return;
    }

    setIsLoading(true); // ローディング開始

    try {
      // Firebaseでのログイン処理
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      if (userCredential.user) {
        // ログイン成功時、ユーザー情報を設定
        setUser({
          email: userCredential.user.email || "",
          username: username,
        });
        localStorage.setItem("isAuthenticated", "true"); // 認証状態をローカルストレージに保存

        navigate("/admin/ListView"); // 管理画面にリダイレクト
      }
    } catch (error) {
      const firebaseError = error as FirebaseError; // errorをFirebaseError型にキャスト
      if (firebaseError.code === "auth/wrong-password") {
        setError("パスワードが間違っています。");
      } else if (firebaseError.code === "auth/user-not-found") {
        setError("ユーザーが見つかりません。");
      } else {
        setError("ログインに失敗しました。"); // エラーメッセージを表示
      }
    } finally {
      setIsLoading(false); // ローディング終了
    }
  };

  // ログイン画面のUIを表示
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        background: "white",
        padding: "clamp(1rem, 5vw, 3rem)",
      }}
    >
      {/* ローディングインジケーターを表示 */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: "clamp(1.5rem, 5vw, 3rem)",
          borderRadius: 1,
          width: "clamp(280px, 90%, 400px)",
          textAlign: "center",
          zIndex: 1,
          border: "1px solid #000000", // 枠線を追加
        }}
      >
        <img
          src={logo}
          alt="会社ロゴ"
          style={{
            marginTop: "clamp(0.5rem, 2vw, 1rem)",
            marginBottom: "clamp(0.5rem, 2vw, 1rem)",
            width: "clamp(40px, 20%, 80px)",
          }}
        />
        <Typography
          variant="h4"
          sx={{
            marginBottom: 2,
            fontWeight: "bold",
            fontSize: { sx: "14px", md: "16px" },
          }}
        >
          ログイン
        </Typography>
        {error && (
          <Typography
            variant="body1"
            sx={{
              color: "red",
              fontSize: { sx: "10px", md: "12px" },
            }}
          >
            {error}
          </Typography>
        )}
        <form onSubmit={handleLogin}>
          <Box sx={{ marginBottom: 2, textAlign: "left" }}>
            <Typography
              component="label"
              htmlFor="username"
              sx={{
                display: "block",
                mt: 2,
                marginBottom: 1,
                fontWeight: "bold",
                fontSize: { sx: "10px", md: "12px" },
              }}
            >
              メールアドレス
            </Typography>
            <TextField
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // ユーザー名の変更を処理
              variant="outlined"
              fullWidth
              required
              sx={{ fontSize: { sx: "10px", md: "12px" } }}
              InputLabelProps={{
                sx: {
                  fontSize: { xs: "10px", sm: "12px" },
                  pt: 0.2,
                },
              }}
              InputProps={{
                sx: {
                  fontSize: { xs: "10px", md: "12px" }, // 入力文字のサイズを調整
                },
              }}
            />
          </Box>
          <Box sx={{ marginBottom: 2, textAlign: "left" }}>
            <Typography
              component="label"
              htmlFor="password"
              sx={{
                display: "block",
                marginBottom: 1,
                fontWeight: "bold",
                fontSize: { sx: "10px", md: "12px" },
              }}
            >
              パスワード
            </Typography>
            <TextField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // パスワードの変更を処理
              variant="outlined"
              fullWidth
              required
              sx={{ mb: 2, fontSize: { sx: "10px", md: "12px" } }}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            disabled={isLoading} // ローディング中はボタンを無効化
            sx={{
              padding: "clamp(8px, 2vw, 12px)",
              background: "rgb(0, 0, 0)",
              color: "white",
              height: "clamp(40px, 8vw, 50px)",
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
              cursor: "pointer",
              transition: "background 0.3s",
              position: "relative", // インジケーターの位置を調整
              "&:hover": {
                background: "rgb(102, 102, 102)", // ホバー時の色を変更
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "ログイン"
            )}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
