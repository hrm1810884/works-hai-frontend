import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme";

export const modalStyle = style({
    width: "100%",
});

export const modalHeaderStyle = style({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    color: "#000000",
});

export const modalContentStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minWidth: "80vw",
    // gap: vars.spacing.lg,
    // backgroundColor: vars.colors.warn[2], // .gray[0],
});

export const modalBodyStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: vars.spacing.md,
    // backgroundColor: vars.colors.dark[9],
});

export const imageStyle = style({
    position: "relative",
    display: "flex",
    width: "80vmin",
    height: "80vmin",
});
