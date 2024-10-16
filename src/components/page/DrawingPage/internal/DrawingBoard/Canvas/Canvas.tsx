import clsx from "clsx";
import { FC, useEffect } from "react";

import { useDrawingCanvas, usePaintingState } from "./hooks";

import { canvasStyle } from "./Canvas.css";

type Props = { className?: string };

export const Canvas: FC<Props> = ({ className }) => {
    const {
        canvasRef,
        canvasContext,
        updateCanvasContext,
        handlers: {
            handleMouseDown,
            handleDraw,
            handleMouseUp,
            handleTouchStart,
            handleMobileDraw,
            handleTouchEnd,
        },
    } = useDrawingCanvas();

    const {
        mutators: { resetPainting },
    } = usePaintingState();

    useEffect(() => {
        updateCanvasContext();
        if (canvasRef?.current) {
            canvasRef.current.width = canvasRef?.current.clientWidth;
            canvasRef.current.height = canvasRef?.current.clientHeight;
            (canvasRef?.current.getContext("2d") as any).fillStyle = "white";
            canvasRef?.current
                .getContext("2d")
                ?.fillRect(0, 0, canvasRef?.current.clientWidth, canvasRef?.current.clientHeight);
        }
    }, [canvasRef, updateCanvasContext]);

    useEffect(() => {
        const canvas = canvasRef?.current;

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
    }, [canvasContext, canvasRef, handleMobileDraw, handleTouchEnd, handleTouchStart]);

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
