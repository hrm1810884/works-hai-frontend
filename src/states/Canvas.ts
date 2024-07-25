/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { atom, useAtom } from "jotai";
import { createRef, MutableRefObject, useCallback } from "react";

import { canvasContext } from "@/model";

import { DRAWING_SIZE } from "@/model/consts";
import { guardUndef } from "@/utils";

const canvasContextAtom = atom<canvasContext>(null);
const canvasRefAtom =
    atom<MutableRefObject<HTMLCanvasElement | null>>(createRef<HTMLCanvasElement>());
export const useCanvas = () => {
    const [canvasContext, setCanvasContext] = useAtom(canvasContextAtom);
    const [canvasRef, _] = useAtom(canvasRefAtom);

    const resizeCanvas = useCallback((canvas: HTMLCanvasElement) => {
        const resizedCanvas = document.createElement("canvas");
        const resizedContext = resizedCanvas.getContext("2d");

        resizedCanvas.width = DRAWING_SIZE;
        resizedCanvas.height = DRAWING_SIZE;

        // 元のCanvasからリサイズされたCanvasに描画
        resizedContext?.drawImage(
            canvas,
            0,
            0,
            canvas.width,
            canvas.height,
            0,
            0,
            resizedCanvas.width,
            resizedCanvas.height
        );
        return resizedCanvas;
    }, []);

    const getDrawingLink = useCallback(() => {
        const currentCanvas = guardUndef(canvasRef.current);

        const resizedCanvas = resizeCanvas(currentCanvas);

        const link = resizedCanvas.toDataURL("image/png");
        return link;
    }, [canvasRef, resizeCanvas]);

    return {
        canvasRef,
        canvasContext,
        setCanvasContext,
        getDrawingLink,
    };
};
