import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme";

export const toolBarStyle = style({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: `${vars.spacing.xl} 12rem ${vars.spacing.xl} 5rem`,
    backgroundColor: vars.colors.primary[4], // blue
});

export const toolButtonsContainerStyle = style({
    display: "flex",
    height: "100%",
    gap: vars.spacing.md,
    justifyContent: "center",
    alignItems: "center",
});

export const colorPaletteIcon = style({
    borderRadius: vars.radius.md,
    cursor: "pointer",
});
