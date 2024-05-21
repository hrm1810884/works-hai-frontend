import { useCallback, useContext } from "react";

import { lineWidth } from "@/types";

import { DrawingContext } from "./DrawingContext";

export const useBrush = () => {
    const { brush, setBrush } = useContext(DrawingContext);

    const changeBrushColor = useCallback(
        (color: string) => {
            setBrush((prev) => ({
                ...prev,
                color: color,
            }));
        },
        [setBrush]
    );

    const changeBrushWidth = useCallback(
        (width: lineWidth) => {
            setBrush((prev) => ({
                ...prev,
                width: width,
            }));
        },
        [setBrush]
    );

    return {
        brush,
        mutator: {
            changeBrushColor,
            changeBrushWidth,
        },
    };
};
