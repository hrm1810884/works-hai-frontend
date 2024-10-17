import { style } from "@vanilla-extract/css";

import { vars as varsTheme } from "@/styles/theme";

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
    // height: "70%",
    backgroundColor: vars.colors.gray[1],
});

export const generationButtonWrapperStyle = style({
    display: "flex",
    position: "relative",
    width: "100%",
    // position: "absolute",
    // left: "50%",
    // // top: "25%",
    // bottom: vars.spacing.lg,
    // transform: "translateX(-50%)",
});

export const BottomAreaWrapperStyle = style({
    position: "absolute",
    left: "50%",
    width: "100vmin",
    height: "10vmin",
    bottom: 0,
    transform: "translateX(-50%)",
    backgroundColor: varsTheme.colors.dark[9],
});
