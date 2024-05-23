import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const widthBar = style({
    display: "flex",
    width: "16px",
    backgroundColor: "#4b5563",
});

export const menuDropDownStyle = style({
    display: "flex",
    flexDirection: "column",
});

export const menuStyle = style({
    display: "flex",
    flexDirection: "column",
});

export const selectedStyle = style({
    backgroundColor: vars.colors.primary[2],
});
