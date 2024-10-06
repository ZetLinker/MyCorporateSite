import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface NewsItem {
  date: string;
  title: string;
  id: string; // Add id field to navigate to the detail page
}

interface NewsStreamProps {
  news: NewsItem[];
}

const NewsStream: React.FC<NewsStreamProps> = ({ news }) => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate(); // Initialize navigate

  const handlePrev = () => {
    if (news.length === 0) return;

    setFade(false);
    setTimeout(() => {
      setCurrentNewsIndex((prevIndex) =>
        prevIndex === 0 ? news.length - 1 : prevIndex - 1
      );
      setFade(true);
    }, 600);
  };

  const handleNext = () => {
    if (news.length === 0) return;

    setFade(false);
    setTimeout(() => {
      setCurrentNewsIndex((prevIndex) =>
        prevIndex === news.length - 1 ? 0 : prevIndex + 1
      );
      setFade(true);
    }, 600);
  };

  useEffect(() => {
    if (news.length === 0) return;

    // Clear existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Set a new interval
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 6000); // Switch news every 6 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [news.length]);

  const clearAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  if (!news || news.length === 0) {
    console.warn("NewsStream: news array is empty or undefined.");
    return null;
  }

  // Ensure the currentNewsIndex is in range
  const safeIndex =
    currentNewsIndex >= 0 && currentNewsIndex < news.length
      ? currentNewsIndex
      : 0;
  const currentNews = news[safeIndex];

  if (!currentNews || !currentNews.date || !currentNews.title) {
    console.warn(
      "NewsStream: currentNews is undefined or missing properties:",
      currentNews
    );
    return null;
  }

  const handleNewsClick = () => {
    // Navigate to the news detail page when the title or date is clicked
    navigate(`/news/${currentNews.id}`);
  };

  return (
    <Box
      sx={{
        position: "relative", // Set position relative to allow absolute positioning of arrows
        display: "flex",
        alignItems: "center", // Center the content vertically
        justifyContent: "center", // Center the content horizontally
        padding: "10px 0",
        width: "100%",
        backgroundColor: "transparent",
        margin: "0 auto",
        zIndex: 10,
        maxWidth: "600px",
      }}
    >
      {/* Prev button - positioned to the far left */}
      <IconButton
        onClick={() => {
          clearAutoSlide();
          handlePrev();
        }}
        sx={{
          position: "absolute",
          left: 0, // Align to the far left
          top: "50%",
          transform: "translateY(-50%)", // Vertically center the button
          fontSize: { xs: "10px", sm: "12px" },
          fontWeight: { xs: "bold", sm: "normal" },
        }}
      >
        <ArrowBackIosIcon fontSize="inherit" />
      </IconButton>

      {/* Date and title aligned horizontally, clickable */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1, // Ensure the content takes the available space between arrows
          transition: "opacity 0.6s ease",
          opacity: fade ? 1 : 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer",
          padding: "0 20px", // Add padding to ensure enough space for text
        }}
        onClick={handleNewsClick}
      >
        {/* Date */}
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "10px", sm: "12px" },
            textAlign: "center", // Center align the date
            marginRight: "8px",
            flexShrink: 0,
          }}
        >
          {currentNews.date || "日付不明"}
        </Typography>

        {/* Title */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "12px", sm: "14px" },
            textAlign: "center", // Center align the title
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden", // Add margin to create space between date and title
          }}
        >
          title: {currentNews.title}
        </Typography>
      </Box>

      {/* Next button - positioned to the far right */}
      <IconButton
        onClick={() => {
          clearAutoSlide();
          handleNext();
        }}
        sx={{
          position: "absolute",
          right: 0, // Align to the far right
          top: "50%",
          transform: "translateY(-50%)", // Vertically center the button
          fontSize: { xs: "10px", sm: "12px" },
          fontWeight: { xs: "bold", sm: "normal" },
        }}
      >
        <ArrowForwardIosIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default NewsStream;
