import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Image {
  src: string;
  alt: string;
}

interface ImageListSliderProps {
  images: Image[];
}

const ImageListSlider: React.FC<ImageListSliderProps> = ({ images }) => {
  return (
    <Box
      className="slidebox"
      sx={{
        pt: { xs: 1.5, md: 4 },
        pb: { xs: 1, md: 4 },
        textAlign: "center",
        backgroundColor: "#ededed", // 背景色を設定
        opacity: 0.6,
        backdropFilter: "blur(10px)",
      }}
    >
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 0, // 遅延を0に設定することで常に動くようにする
          disableOnInteraction: false,
        }}
        speed={5000} // スピードを一定に保つ
        spaceBetween={30}
        centeredSlides={false}
        allowTouchMove={false}
        breakpoints={{
          0: {
            slidesPerView: 2, // モバイルで2枚表示
          },
          600: {
            slidesPerView: 4, // デスクトップで4枚表示
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={image.src}
              alt={image.alt}
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: "400px", // 最大幅を400pxに設定
                maxHeight: "400px", // 最大高さを400pxに設定
                objectFit: "cover", // 画像をコンテナに収めるようにカバー
                margin: "0 auto", // 画像を中央に配置
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageListSlider;
