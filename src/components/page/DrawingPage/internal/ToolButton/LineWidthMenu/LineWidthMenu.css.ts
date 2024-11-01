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

const LINE_WIDTH_BAR_HEIGHT = 48;

export const lineWidthBarStyle = style({
    display: "flex",
    width: LINE_WIDTH_BAR_HEIGHT,
    borderRadius: vars.radius.sm,
    backgroundColor: vars.colors.gray[5],
});
export const subContainerStyle = style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: vars.spacing.xs,
});
