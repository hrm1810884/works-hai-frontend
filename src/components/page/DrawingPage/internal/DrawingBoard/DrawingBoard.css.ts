import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { DRAWING_BOARD_SIZE } from "@/model";

export const drawingBoardContainerStyle = style({
    display: "grid",
    gridTemplateColumns: `repeat(3, ${DRAWING_BOARD_SIZE})`,
    gridTemplateRows: `repeat(3, ${DRAWING_BOARD_SIZE})`,
});

export const imageAlignStyle = recipe({
    base: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    variants: {
        position: {
            top: { gridColumn: "2", gridRow: "1" },
            middleLeft: { gridColumn: "1", gridRow: "2" },
            middleCenter: { gridColumn: "2", gridRow: "2" },
            middleRight: { gridColumn: "3", gridRow: "2" },
            bottom: { gridColumn: "2", gridRow: "3" },
        },
    },
});
