import { useCallback, useContext } from "react";

import { BrushType, lineWidth } from "@/model";

import { DrawingContext } from "./DrawingContext";

export const useBrush = () => {
    const { brush, setBrush } = useContext(DrawingContext);

    const setBrushColor = useCallback(
        (color: string) => {
            setBrush((prev) => ({
                ...prev,
                color: color,
            }));
        },
        [setBrush]
    );

    const setBrushWidth = useCallback(
        (width: lineWidth) => {
            setBrush((prev) => ({
                ...prev,
                width: width,
            }));
        },
        [setBrush]
    );

    const setBrushType = useCallback(
        (type: BrushType) => {
            setBrush((prev) => ({
                ...prev,
                type: type,
            }));
        },
        [setBrush]
    );

    return {
        brush,
        mutator: {
            setBrushColor,
            setBrushWidth,
            setBrushType,
        },
    };
};
