import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import News from "./components/pages/News";
import Contact from "./components/pages/Contact";
import Service from "./components/pages/Service";
import Login from "./components/login/Login";
import ScrollToTop from "./components/util/ScrollToTop";
import NewsDetail from "./components/pages/NewsDetail";
import AboutUs from "./components/pages/AboutUs";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import Sidebar from "./components/admin/Sidebar";
import ListView from "./components/admin/news/ListView";
import NewPost from "./components/admin/news/NewPost";
import EditPost from "./components/admin/news/EditPost";
import { AuthProvider } from "./components/admin/shared/AuthContext";
import { SidebarProvider } from "./components/admin/shared/SidebarContext";
import MaintenancePage from "./components/MaintenancePage";
import Dashboard from "./components/admin/Dashboard";
import Drafts from "./components/admin/news/Drafts";
import Detail from "./components/admin/news/Detail";
import PrivateRoute from "./components/PrivateRoute";
import InquiryList from "./components/admin/Inquiry/InquiryList";

// カスタムテーマの作成
const theme = createTheme({
  palette: {
    primary: {
      main: "#222222",
    },
    secondary: {
      main: "#666666",
    },
  },
  typography: {
    fontFamily: "'sans-serif'",
  },
});

// メンテナンスモードの状態
const isMaintenanceMode = false; // trueでメンテナンスモードON

// Appコンポーネント
const App: React.FC = () => {
  // Google Analyticsのスクリプトを追加するuseEffect
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-QMR73FXFFR"; // YOUR_MEASUREMENT_IDに置き換え
    document.head.appendChild(script);

    script.onload = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function gtag() {
        (window as any).dataLayer.push(arguments);
      };
      (window as any).gtag("js", new Date());
      (window as any).gtag("config", "G-T74F2B61CB");
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              MsUserSelect: "none",
              WebkitTouchCallout: "none",
              overscrollBehavior: "none",
            },
          }}
        />
        <Router>
          <ScrollToTop />
          <div style={{ width: "100%" }}>
            <Routes>
              {/* 管理者用ルート */}
              <Route
                path="/admin/*"
                element={
                  <PrivateRoute>
                    <SidebarProvider>
                      <div style={{ position: "relative", overflow: "hidden" }}>
                        <Sidebar />
                        <Routes>
                          <Route path="dashboard" element={<Dashboard />} />
                          <Route path="news/list" element={<ListView />} />
                          <Route path="news/post" element={<NewPost />} />
                          <Route path="news/edit/:id" element={<EditPost />} />
                          <Route path="news/drafts" element={<Drafts />} />
                          <Route path="news/detail/:id" element={<Detail />} />
                          <Route
                            path="inquiry/list"
                            element={<InquiryList />}
                          />
                          <Route
                            path="*"
                            element={<Navigate to="/admin/dashboard" />}
                          />
                        </Routes>
                      </div>
                    </SidebarProvider>
                  </PrivateRoute>
                }
              />
              {/* 一般ユーザー用ルート */}
              <Route
                path="/zetlogin"
                element={
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <Header />
                    <Login />
                    <Footer />
                  </div>
                }
              />
              <Route
                path="*"
                element={
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <Header />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/aboutus" element={<AboutUs />} />
                      <Route path="/service" element={<Service />} />
                      <Route path="/news" element={<News />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route
                        path="/privacy-policy"
                        element={<PrivacyPolicy />}
                      />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                    <Footer />
                  </div>
                }
              />
              <Route
                path="/news/:id"
                element={
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <Header />
                    <NewsDetail />
                  </div>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
