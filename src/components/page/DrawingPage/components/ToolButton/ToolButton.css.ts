import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme";

export const toolButtonStyle = recipe({
    base: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "2.5rem",
        height: "2.5rem",
        backgroundColor: "transparent",
        vars: {
            "--button-bg": vars.colors.primary[4],
            "--button-hover": vars.colors.primary[1],
            "--button-bd": "none",
        },
    },
    variants: {
        selected: {
            true: { border: `1px solid ${vars.colors.primary[1]}` },
            false: { border: "none" },
        },
    },
    defaultVariants: {
        selected: false,
    },
});
