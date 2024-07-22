import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { Brush, BrushType, lineWidth } from "@/model";

const defaultBrush: Brush = { type: "PENCIL", width: 3, color: "#000000" };
const brushAtom = atom<Brush>(defaultBrush);
export const useBrush = () => {
    const [brush, setBrush] = useAtom(brushAtom);

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
