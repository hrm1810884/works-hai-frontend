import { style, keyframes } from "@vanilla-extract/css";

import { vars } from "@/styles/theme";

const slideFromTop = keyframes({
    "0%": {
        transform: "translateX(-50%) translateY(-100%)",
    },
    "100%": {
        transform: "translateX(-50%) translateY(0)",
    },
});

export const modalStyle = style({
    animation: `${slideFromTop} 0.5s ease-out`,
    position: "absolute",
    width: "max-content",
    backgroundColor: "white",
    border: "1px solid #d1d1d1",
    padding: "0.5rem",
    left: "50%",
    borderRadius: "0.5rem",
    transform: "translateX(-50%)",
});

export const colorPickerStyle = style({
    //     width: "20px",
    //     height: "20px",
});

export const widthSlectButtonStyle = style({
    cursor: "pointer",
    padding: "8px 12px", // Equivalent to py-2 px-3
    borderRadius: "8px", // Equivalent to rounded-lg
    fontSize: "0.75rem", // Equivalent to text-xs
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px", // Equivalent to gap-4
    position: "relative",
    backgroundColor: "white",
    border: "1px solid transparent", // For hover effect to not shift content
    transition: "background-color 0.3s",

    ":hover": {
        backgroundColor: `${vars.colors.gray[0]}`, // Equivalent to hover:bg-neutral-100
    },
});

export const widthBarStyle = style({
    width: "16px",
    backgroundColor: "#4b5563",
});

export const selectedWidthHighlight = style({
    position: "absolute",
    height: "0.75rem", // 3 ピクセルの高さ
    borderRadius: "0.5rem", // 3 ピクセルの丸み
    width: "0.25rem", // 1 ピクセルの幅
    backgroundColor: "#5a67d8", // bg-indigo-600 のカラーコード
    left: 0,
    transform: "translateX(-50%)",
});

export const selectedWidthBackground = style({
    backgroundColor: `${vars.colors.gray[0]}`,
});

export const lineWidthInputWrapper = style({
    width: "100%", // w-full
    paddingLeft: "0.25rem", // px-1 (1rem = 16px)
    paddingRight: "0.25rem", // px-1 (1rem = 16px)
    borderRadius: "0.5rem", // rounded-lg (1rem = 16px)
    fontSize: "0.75rem", // text-xs (1rem = 16px)
    display: "flex", // flex
    alignItems: "center", // items-center
    gap: "0.5rem", // gap-2 (1rem = 16px)
    position: "relative", // relative
});

export const lineWidthInputStyle = style({
    paddingLeft: "0.5rem", // px-2 (1rem = 16px)
    paddingRight: "0.5rem", // px-2 (1rem = 16px)
    width: "5rem", // w-20 (1rem = 16px)
    height: "1.5rem", // h-6 (1rem = 16px)
    backgroundColor: "#ffffff", // bg-white
    border: "1px solid #d1d5db", // border border-neutral-300
    borderRadius: "0.5rem", // rounded-lg (1rem = 16px)
});
