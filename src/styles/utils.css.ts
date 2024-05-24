import { recipe } from "@vanilla-extract/recipes";

export const styleUtils = {
    canvasStyle: recipe({
        base: {
            display: "flex",
            width: "512px",
            height: "512px",
        },

        variants: {
            cursor: {
                human: { cursor: "crosshair" },
                ai: { cursor: "pointer" },
            },
        },
    }),
};
