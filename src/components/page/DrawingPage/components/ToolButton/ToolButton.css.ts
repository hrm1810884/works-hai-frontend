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
        "--button-hover": "red",
        "--button-bd": "none",
    },
});

export const selectedIconHighlightStyle = style({
    display: "flex",
    height: "0.5rem", // h-1 (1rem = 16px)
    width: "2.5rem", // w-5 (1rem = 16px)
    backgroundColor: "#FFFFFF", // bg-indigo-500
    borderTopLeftRadius: "0.5rem", // rounded-t-lg (1rem = 16px, top-left and top-right)
    borderTopRightRadius: "0.5rem", // rounded-t-lg (1rem = 16px, top-left and top-right)
});
