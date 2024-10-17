/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { atom, useAtom } from "jotai";
import { createRef, MutableRefObject, useCallback } from "react";

import { canvasContext } from "@/model";

import { DRAWING_SIZE } from "@/model/consts";
import { guardUndef } from "@/utils";

type DensityValidation = {
    validated: boolean;
    whitePixelsProportion: number;
}

const canvasContextAtom = atom<canvasContext>(null);
const canvasRefAtom =
    atom<MutableRefObject<HTMLCanvasElement | null>>(createRef<HTMLCanvasElement>());
const proportionAtom = atom<DensityValidation>({"validated": false, "whitePixelsProportion": 1.0})
export const useCanvas = () => {
    const [canvasContext, setCanvasContext] = useAtom(canvasContextAtom);
    const [canvasRef, _] = useAtom(canvasRefAtom);
    const [densityValidation, setDensityValidation] = useAtom(proportionAtom);

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

    // Function to calculate the proportion of white pixels in the canvas
    const calculateWhitePixelsProportion = useCallback(() => {
        const currentCanvas = guardUndef(canvasRef.current);
        const context = currentCanvas.getContext("2d");

        if (!context) return;

        const { width, height } = currentCanvas;
        const borderWidth = width / 8;
        const borderHeight = height / 8;

        const imageData = context.getImageData(0, 0, currentCanvas.width, currentCanvas.height);
        const { data } = imageData;

        let whitePixelCount = 0;
        let totalCounts = 0;

        // Iterate through every pixel in the image
        for (let i = 0; i < data.length; i += 4) {
            const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];

            const h: number = Math.floor( (i / 4) / width );
            const w: number = (i / 4) % width;
            if (h >= borderHeight && h < height - borderHeight) {
                continue;
            }
            if (w >= borderWidth && w < width - borderWidth) {
                continue;
            }

            totalCounts ++;
            // Check if pixel is white (RGBA = 255, 255, 255, 255)
            if (r === 255 && g === 255 && b === 255 && a === 255) {
                whitePixelCount++;
            }
        }

        const threshold:number = 0.3;
        const whitePixelsProportion: number = whitePixelCount / totalCounts;

        setDensityValidation({
            validated: whitePixelsProportion < threshold, 
            whitePixelsProportion: whitePixelsProportion
        });
        console.log(whitePixelCount /totalCounts);
    }, [canvasRef]);

    return {
        canvasRef,
        canvasContext,
        setCanvasContext,
        getDrawingLink,
        densityValidation, 
        calculateWhitePixelsProportion, 
    };
};
