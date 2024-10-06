import React from "react";
import { Box, Typography } from "@mui/material";
import FadeInOnScroll from "./FadeInOnScroll";

const ValueBox: React.FC<{
  number: string;
  title: string;
  description: string;
}> = ({ number, title, description }) => (
  <FadeInOnScroll>
    <Box
      sx={{
        display: "flex", // Flexbox for centering
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        textAlign: "center", // Center text
        mt: 10,
        width: "100%", // Parent element width is 100%
      }}
    >
      <Box
        className="vbox"
        sx={{
          width: { xs: "300px", md: "350px" }, // Set a fixed width for all boxes
          position: "relative",
          textAlign: "center",
          padding: "20px",
          border: "1px solid",
          borderColor: "primary.main", // Border color
          borderRadius: "8px", // Rounded corners
          backgroundColor: "transparent", // Transparent background
          "::before": {
            content: '""',
            position: "absolute",
            top: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "50px",
            backgroundColor: "primary.main", // Same color as the border
          },
        }}
      >
        <Box
          className="vnum"
          sx={{
            fontSize: "2rem", // Larger font size for the number
            fontWeight: "bold",
            color: "secondary.main", // Color for the number
            textAlign: "center", // Center the number
            position: "absolute",
            top: "-50px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {number}.
        </Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "primary.main",
            mt: 1,
            minHeight: "70px", // Minimum height to ensure consistent box size
          }}
        >
          {description.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </Box>
    </Box>
  </FadeInOnScroll>
);

export default ValueBox;
