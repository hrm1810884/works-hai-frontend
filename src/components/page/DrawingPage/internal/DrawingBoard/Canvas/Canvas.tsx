import clsx from "clsx";
import { FC, useEffect } from "react";

import { useCanvas } from "@/states/Canvas";

import { useDrawingCanvas, usePaintingState } from "./hooks";

import { canvasStyle } from "./Canvas.css";

type Props = { className?: string };

export const Canvas: FC<Props> = ({ className }) => {
    const {
        handlers: {
            handleMouseDown,
            handleDraw,
            handleMouseUp,
            handleTouchStart,
            handleMobileDraw,
            handleTouchEnd,
        },
    } = useDrawingCanvas();

    const { canvasRef, getCanvasContext, clearCanvas } = useCanvas();

    const {
        mutators: { resetPainting },
    } = usePaintingState();

    useEffect(() => {
        if (canvasRef?.current) {
            canvasRef.current.width = canvasRef?.current.clientWidth;
            canvasRef.current.height = canvasRef?.current.clientHeight;
            clearCanvas();
        }
    }, [canvasRef, clearCanvas]);

    useEffect(() => {
        const canvas = canvasRef?.current;
        const canvasContext = getCanvasContext(canvasRef.current);
        if (canvasContext && canvas) {
            canvas.addEventListener("touchstart", handleTouchStart, {
                passive: false,
            });
            canvas.addEventListener("touchmove", handleMobileDraw, {
                passive: false,
            });
            canvas.addEventListener("touchend", handleTouchEnd, { passive: false });
        }

        return () => {
            canvas?.removeEventListener("touchstart", handleTouchStart);
            canvas?.removeEventListener("touchmove", handleMobileDraw);
            canvas?.removeEventListener("touchend", handleTouchEnd);
        };
    }, [getCanvasContext, canvasRef, handleMobileDraw, handleTouchEnd, handleTouchStart]);

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={(e) => handleMouseDown(e)}
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseMove={(e) => handleDraw(e)}
            onMouseLeave={(e) => {
                handleDraw(e);
                resetPainting();
            }}
            id="canvasElement"
            className={clsx(canvasStyle, className)}
        ></canvas>
    );
};
