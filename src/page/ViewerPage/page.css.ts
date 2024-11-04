import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const wrapper = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: vars.colors.background[7],
});

export const controlWrapper = style({
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: "5px",
    zIndex: 100,
});

export const viewerGrid = style({
    minWidth: "100vw",
    minHeight: "100vh",
});
