import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const pageWrapperStyle = style({
    position: "relative",
    width: "100vw",
    height: "100vh",
    maxHeight: "100vh",
    overflow: "hidden",
    backgroundColor: vars.colors.dark[9], // .gray[1],
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
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
