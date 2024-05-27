import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const pageWrapperStyle = style({
    position: "relative",
    width: "100vw",
    height: "99vh",
    maxHeight: "99vh",
    overflow: "hidden",
    backgroundColor: vars.colors.gray[1],
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
});

export const drawingWrapperStyle = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
});
