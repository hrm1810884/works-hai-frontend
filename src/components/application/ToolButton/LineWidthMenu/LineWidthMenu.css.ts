import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const menuItemStyle = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

const LINE_WIDTH_BAR_WIDTH = 48;

export const lineWidthBarStyle = style({
    display: "flex",
    width: LINE_WIDTH_BAR_WIDTH,
    borderRadius: vars.radius.sm,
    backgroundColor: vars.colors.gray[5],
});
export const subContainerStyle = style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: vars.spacing.xs,
});

globalStyle(`${menuItemStyle} *`, {
    padding: 0,
    margin: 0,
    fontSize: vars.fontSizes.xs,
    lineHeight: vars.lineHeights.xs,
    color: vars.colors.white,
});
