import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { Brush, BrushType } from "@/model";

export const DEFAULT_LINE_WIDTH = 8;
export const defaultBrush: Brush = {
    type: "PENCIL",
    width: { PENCIL: DEFAULT_LINE_WIDTH, ERASER: DEFAULT_LINE_WIDTH },
    color: "#000000",
};
const brushAtom = atom<Brush>(defaultBrush);
export const useBrush = () => {
    const [brush, setBrush] = useAtom(brushAtom);

    const setBrushColor = useCallback(
        (color: string) => {
            setBrush((prev) => {
                if (prev.type === "PENCIL") {
                    return {
                        ...prev,
                        color: color,
                    };
                } else {
                    return prev;
                }
            });
        },
        [setBrush]
    );

    const setBrushWidth = useCallback(
        (width: number) => {
            setBrush((prev) => ({
                ...prev,
                width: {
                    ...prev.width,
                    [prev.type]: width,
                },
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
