import { style } from "@vanilla-extract/css";

import { ICON_SIZE } from "@/model";

import { vars } from "@/styles";

export const wrapperStyle = style({
    padding: vars.spacing.sm,
});

export const iconStyle = style({
    borderRadius: "10px",
    width: ICON_SIZE,
    height: ICON_SIZE,
    verticalAlign: "middle",
});

export const colorPaletteStyle = style({
    border: "none",
    backgroundColor: "transparent",
    opacity: 0,
});
