import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  TextField,
  Alert,
} from "@mui/material";
import dayjs from "dayjs";
import SidebarToggleButton from "./shared/SidebarToggleButton";
import { functions } from "../../firebase-config";
import { httpsCallable } from "firebase/functions";
import { useSidebar } from "./shared/SidebarContext"; // SidebarContextを使用

// ChartJSの登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsData {
  date: string;
  accessCount: number;
  displayCount: number;
  newUsers: number;
  totalUsers: number;
  returningUsers: number; // フロントエンドで計算するため、この変数は残しておく
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [startDate, setStartDate] = useState<string>(
    dayjs().subtract(7, "day").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [totalNewUsers, setTotalNewUsers] = useState<number>(0);
  const [totalUniqueUsers, setTotalUniqueUsers] = useState<number>(0);
  const { isOpen, sidebarWidth } = useSidebar(); // SidebarContextから状態を取得

  // 日付のバリデーション
  const validateDates = (): boolean => {
    if (dayjs(startDate).isAfter(dayjs(endDate))) {
      setValidationError("開始日は終了日より前に設定してください。");
      return false;
    }
    setValidationError(null);
    return true;
  };

  // 初回表示時にAPIを叩く関数
  const fetchInitialData = async () => {
    if (validateDates()) {
      await fetchAnalyticsData(startDate, endDate);
    }
  };

  // ボタン押下時のデータ取得
  const handleFetchData = async () => {
    if (validateDates()) {
      await fetchAnalyticsData(startDate, endDate);
    }
  };
  // 日付範囲を生成する関数
  const generateDateRange = (start: string, end: string) => {
    const dates = [];
    let current = dayjs(start);
    while (current.isBefore(dayjs(end)) || current.isSame(dayjs(end))) {
      dates.push(current.format("YYYYMMDD"));
      current = current.add(1, "day");
    }
    return dates;
  };

  // Google Analyticsデータを取得する関数
  const fetchAnalyticsData = async (start: string, end: string) => {
    setLoading(true);
    setError(null);

    try {
      const getAnalyticsData = httpsCallable<
        { startDate: string; endDate: string },
        any
      >(functions, "getAnalyticsData");
      const result = await getAnalyticsData({ startDate: start, endDate: end });

      const rawData = result.data;

      if (!Array.isArray(rawData) || rawData.length === 0) {
        setError("Google Analyticsにデータが存在しません。");
        setData([]); // データをリセット
        setLoading(false);
        return;
      }

      const allDates = generateDateRange(start, end);
      const formattedData = allDates.map((date) => {
        const found = rawData.find(
          (item) => item.dimensionValues?.[0]?.value === date
        );
        const accessCount = found
          ? parseInt(found.metricValues?.[0]?.value || "0", 10)
          : 0;
        const displayCount = found
          ? parseInt(found.metricValues?.[1]?.value || "0", 10)
          : 0;
        const newUsers = found
          ? parseInt(found.metricValues?.[2]?.value || "0", 10)
          : 0;
        const totalUsers = found
          ? parseInt(found.metricValues?.[3]?.value || "0", 10)
          : 0;
        const returningUsers = Math.max(accessCount - newUsers, 0);

        return {
          date,
          accessCount,
          displayCount,
          newUsers,
          totalUsers,
          returningUsers,
        };
      });

      const totalNewUsersCount = formattedData.reduce(
        (sum, item) => sum + item.newUsers,
        0
      );
      const uniqueUsers = new Set(
        rawData.map((item) => item.dimensionValues?.[0]?.value)
      ).size;

      setTotalNewUsers(totalNewUsersCount);
      setTotalUniqueUsers(uniqueUsers);
      setData(formattedData);
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
      setError("データの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  // 初回レンダリング時のみ実行
  useEffect(() => {
    fetchInitialData();
  }, []);

  // アクティブユーザー数グラフ用データの生成
  const accessChartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "アクティブユーザ",
        data: data.map((item) => item.accessCount),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "新規ユーザ",
        data: data.map((item) => item.newUsers),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
      {
        label: "リピーター数",
        data: data.map((item) => item.returningUsers),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const displayChartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "表示回数",
        data: data.map((item) => item.displayCount),
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
          precision: 0,
          callback: (value: number) => value.toFixed(0),
        },
      },
    },
  };

  const totalAccessCount = data.reduce(
    (sum, item) => sum + (item.accessCount || 0),
    0
  );

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
          width: { xs: "90%", sm: "80%" }, // 幅を設定
          mx: "auto", // 左右のマージンを自動にして中央寄せ
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
          ダッシュボード
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <TextField
            label="開始日"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 150 }}
            InputProps={{
              sx: {
                fontSize: { xs: "12px", sm: "14px" }, // xsは12px, smは14pxに設定
              },
            }}
          />
          <TextField
            label="終了日"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 150 }}
            InputProps={{
              sx: {
                fontSize: { xs: "12px", sm: "14px" },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleFetchData}
            disabled={loading}
          >
            {loading ? "読み込み中..." : "データ取得"}
          </Button>
        </Stack>

        {validationError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {validationError}
          </Alert>
        )}

        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 3 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <Card sx={{ flex: 1, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                アクティブユーザー数
              </Typography>
              <Typography variant="h4">
                {Number.isNaN(totalAccessCount) ? 0 : totalAccessCount}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                ※期間内にサイトへ訪れたユーザー数/日の合計です。
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                新規ユーザー数
              </Typography>
              <Typography variant="h4">
                {Number.isNaN(totalNewUsers) ? 0 : totalNewUsers}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                ※期間内に新規アクセスされたユーザー数の合計です。
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* アクティブユーザー数とその他ユーザー数のグラフ */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "background.paper",
            mb: 4,
            display: "flex",
            justifyContent: "center", // グラフを左右中央寄せ
            alignItems: "center", // グラフを上下中央寄せ
          }}
        >
          <Line data={accessChartData} options={chartOptions} />
        </Box>

        {/* 表示回数のグラフ */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "background.paper",
            display: "flex",
            justifyContent: "center", // グラフを左右中央寄せ
            alignItems: "center", // グラフを上下中央寄せ
          }}
        >
          <Line data={displayChartData} options={chartOptions} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
