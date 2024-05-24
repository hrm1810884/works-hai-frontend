import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles";

export const menuItemStyle = recipe({
    base: {
        selectors: {
            "&[data-hovered='true']": {
                backgroundColor: vars.colors.gray[4],
            },
        },
    },

    variants: {
        selected: {
            true: { backgroundColor: vars.colors.gray[2] },
            false: { backgroundColor: "transparent" },
        },
    },

    defaultVariants: {
        selected: false,
    },
});

export const lineWidthBar = style({
    display: "flex",
    width: "16px",
    backgroundColor: vars.colors.gray[5],
});
