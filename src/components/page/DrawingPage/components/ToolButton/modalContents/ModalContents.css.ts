import { style, keyframes } from "@vanilla-extract/css";

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
    zIndex: 50,
    transform: "translateX(-50%)",
});

export const colorPickerStyle = style({
    //     width: "20px",
    //     height: "20px",
});
