import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme";

export const toolButtonStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "2.5rem",
    height: "2.5rem",
    vars: {
        "--button-bg": vars.colors.primary[4],
        "--button-hover": vars.colors.primary[1],
        "--button-bd": "none",
    },
});

export const selectedIconHighlightStyle = style({
    border: `1px solid ${vars.colors.primary[1]}`,
});
