import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme";

export const bottomToolBarStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: vars.spacing.sm,
    padding: `${vars.spacing.xl} 12rem ${vars.spacing.xl} 5rem`,
    backgroundColor: vars.colors.dark[9], // .primary[4], // blue
});

export const toolButtonsContainerStyle = style({
    display: "flex",
    position: "relative",
    height: "100%",
    gap: vars.spacing.md,
    justifyContent: "center",
    alignItems: "center",
});

export const textSpanStyle = style({
    // display: "flex",
    position: "relative",
    height: "100%",
    gap: vars.spacing.md,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: vars.colors.gray[0],
    fontSize: vars.fontSizes.xl,
});

export const colorPaletteIcon = style({
    borderRadius: vars.radius.md,
    cursor: "pointer",
});
