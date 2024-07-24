import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { Brush, BrushType, lineWidth, lineWidthData } from "@/model";

const defaultBrush: Brush = { type: "PENCIL", width: 3, color: "#000000" };
const brushAtom = atom<Brush>(defaultBrush);
export const useBrush = () => {
    const [brush, setBrush] = useAtom(brushAtom);

    const setBrushColor = useCallback(
        (color: string) => {
            setBrush((prev) => ({
                ...prev,
                type: "PENCIL",
                color: color,
            }));
        },
        [setBrush]
    );

    const setBrushWidth = useCallback(
        (width: number) => {
            setBrush((prev) => {
                // 型ガードを使って幅が正しい型であることを確認
                const isValidWidth = (
                    type: BrushType,
                    width: number
                ): width is lineWidth<typeof type> => {
                    return lineWidthData[type].includes(width as any);
                };

                if (isValidWidth(prev.type, width)) {
                    return {
                        ...prev,
                        width: width,
                    };
                } else {
                    console.warn(`Invalid width: ${width} for brush type: ${prev.type}`);
                    return prev;
                }
            });
        },
        [setBrush]
    );

    const setBrushType = useCallback(
        (type: BrushType) => {
            setBrush((prev) => ({
                ...prev,
                type: type,
                width: lineWidthData[type][0],
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
