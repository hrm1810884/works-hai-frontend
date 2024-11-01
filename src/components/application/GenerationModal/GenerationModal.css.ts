import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme";

export const modalHeaderStyle = style({
    width: "100%",
    color: vars.colors.black,
});

export const modalContentStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: "auto",
});

export const modalBodyStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    width: "80vw",
    gap: vars.spacing.md,
    // backgroundColor: vars.colors.dark[9],
});

export const imageStyle = style({
    position: "relative",
    display: "flex",
    width: "80vmin",
    height: "80vmin",
});
