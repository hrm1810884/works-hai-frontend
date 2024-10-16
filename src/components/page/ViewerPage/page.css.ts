import { style } from "@vanilla-extract/css";

export const wrapper = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
});

export const controlWrapper = style({
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: "5px",
    zIndex: 100,
});
