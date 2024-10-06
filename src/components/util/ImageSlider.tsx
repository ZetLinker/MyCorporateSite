import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface ImageSliderProps {
  images: string[]; // スライドする画像の配列
  backgroundColor?: string; // バックグラウンドカラーを任意で設定
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  backgroundColor = "transparent",
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        opacity: 1,
        mt: { xs: 1, md: 10 },
        mb: { xs: 1, md: 10 },
        pt: { xs: 1, md: 4 },
        pb: { xs: 1, md: 3 },
        backgroundColor,
      }}
    >
      <Box className="swiper-container" sx={{ position: "relative" }}>
        <Swiper
          modules={[Autoplay]}
          loop={true} // ループを有効にする
          loopAdditionalSlides={4} // 追加のスライドを確保
          autoplay={{
            delay: 0, // 遅延なしでスムーズなスライドを実現
            disableOnInteraction: false, // ユーザー操作後もスライドを続ける
          }}
          speed={35000} // 全スライドが移動する速度（ミリ秒）
          slidesPerView="auto" // 複数スライドを同時に表示
          spaceBetween={0} // スライド間のスペース
          centeredSlides={false} // スライドを左寄せで表示
          allowTouchMove={false} // ユーザーによるスライドを無効化
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={image}
                alt={`Slide ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <style>{`
        .swiper-wrapper {
          transition-timing-function: linear;
        }
      `}</style>
    </Box>
  );
};

export default ImageSlider;
