import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const drawingBoardContainerStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "80vmin",
    maxWidth: "80vmin",
    overflow: "hidden",
});

export const horizontalDrawingContainerStyle = style({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
});

export const verticalDrawingContainerStyle = recipe({
    base: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    variants: {
        position: {
            top: { justifyContent: "flex-end" },
            bottom: { justifyContent: "flex-start" },
        },
    },
});
