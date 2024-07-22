import { style } from "@vanilla-extract/css";

export const modalStyle = style({
    width: "100%",
});

export const modalContentStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "1024px",
    minWidth: "80vw",
    gap: "5px",
});

export const imageStyle = style({
    display: "flex",
});
