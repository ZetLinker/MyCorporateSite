// SlideInAnimation.tsx

export const slideInKeyframes = {
  "@keyframes slideInFromTop": {
    from: { transform: "translateY(-100%)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
  "@keyframes slideInFromBottom": {
    from: { transform: "translateY(100%)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
  "@keyframes slideInFromLeft": {
    from: { transform: "translateX(-100%)", opacity: 0 },
    to: { transform: "translateX(0)", opacity: 1 },
  },
  "@keyframes slideInFromRight": {
    from: { transform: "translateX(100%)", opacity: 0 },
    to: { transform: "translateX(0)", opacity: 1 },
  },
};

// Slide-in animation settings
export const slideInFromTopAnimation = "slideInFromTop 2s ease forwards";
export const slideInFromBottomAnimation = "slideInFromBottom 2s ease forwards";
export const slideInFromLeftAnimation = "slideInFromLeft 2s ease forwards";
export const slideInFromRightAnimation = "slideInFromRight 2s ease forwards";
