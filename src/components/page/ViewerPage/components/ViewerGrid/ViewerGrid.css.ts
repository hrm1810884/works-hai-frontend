import { style } from "@vanilla-extract/css";

export const gridStyle = style({
    display: "grid",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transformOrigin: "center center",
    width: "fit-content",
    height: "fit-content",
});
