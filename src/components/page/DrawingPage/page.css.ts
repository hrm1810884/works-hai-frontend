import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const pageWrapperStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    position: "relative",
    width: "100vw",
    height: "100vh",
    backgroundColor: vars.colors.dark[9],
});

export const drawingWrapperStyle = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: "1 / 1",
    maxHeight: "100vmin",
    overflow: "hidden",
    backgroundColor: vars.colors.gray[1],
});
