/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { atom, useAtom } from "jotai";
import { createRef, MutableRefObject, useCallback } from "react";

import { WhitePixelsProportion } from "@/model";

import { getCanvasContext } from "@/model/drawing.selector";

const canvasRefAtom =
    atom<MutableRefObject<HTMLCanvasElement | null>>(createRef<HTMLCanvasElement>());
const whitePixelsProportionAtom = atom<WhitePixelsProportion>(1);

export const useCanvas = () => {
    const [whitePixelsProportion, setWhitePixelsPortion] = useAtom(whitePixelsProportionAtom);
    const [canvasRef, __] = useAtom(canvasRefAtom);

    // Function to calculate the proportion of white pixels in the canvas
    const updateWhitePixelsProportion = useCallback(
        (canvas: HTMLCanvasElement) => {
            const context = canvas.getContext("2d");

            if (!context) return;

            const { width, height } = canvas;
            const borderWidth = width / 8;
            const borderHeight = height / 8;

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const { data } = imageData;

            let whitePixelCount = 0;
            let totalCounts = 0;

            // Iterate through every pixel in the image
            for (let i = 0; i < data.length; i += 4) {
                const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];

                const h: number = Math.floor(i / 4 / width);
                const w: number = (i / 4) % width;
                if (
                    h >= borderHeight &&
                    h < height - borderHeight &&
                    w >= borderWidth &&
                    w < width - borderWidth
                ) {
                    continue;
                }

                totalCounts++;
                // Check if pixel is white (RGBA = 255, 255, 255, 255)
                if (r === 255 && g === 255 && b === 255 && a === 255) {
                    whitePixelCount++;
                }
            }

            const whitePixelsProportion = whitePixelCount / totalCounts;

            setWhitePixelsPortion(whitePixelsProportion);
        },
        [setWhitePixelsPortion]
    );

    const clearCanvas = useCallback(() => {
        const canvasContext = getCanvasContext(canvasRef.current);
        if (canvasContext) {
            canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
            updateWhitePixelsProportion(canvasContext.canvas);
        }
    }, [canvasRef, updateWhitePixelsProportion]);

    return {
        canvasRef,
        whitePixelsProportion,
        getCanvasContext,
        clearCanvas,
        updateWhitePixelsProportion,
    };
};
