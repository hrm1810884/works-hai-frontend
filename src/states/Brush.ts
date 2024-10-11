import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { Brush, BrushType, LineWidth, lineWidthData } from "@/model";

const defaultBrush: Brush<"PENCIL"> = { type: "PENCIL", width: 3, color: "#000000" };
const brushAtom = atom<Brush<BrushType>>(defaultBrush);
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
            setBrush((prev) => {
                // 型ガードを使って幅が正しい型であることを確認
                const isValidWidth = <T extends BrushType>(
                    type: T,
                    width: number
                ): width is LineWidth<T> => {
                    return (lineWidthData[type] as readonly number[]).includes(width);
                };

                if (isValidWidth(prev.type, width)) {
                    return {
                        ...prev,
                        width: width as LineWidth<typeof prev.type>, // 正しい幅を設定
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
