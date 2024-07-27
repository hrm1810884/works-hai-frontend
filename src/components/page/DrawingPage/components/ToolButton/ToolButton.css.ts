import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme";

export const toolButtonStyle = recipe({
    base: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        vars: {
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
