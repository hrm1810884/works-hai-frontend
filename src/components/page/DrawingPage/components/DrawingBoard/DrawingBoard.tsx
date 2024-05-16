import { useContext, useEffect } from "react";

import { DrawingContext } from "@/states/DrawingContext";

import { useDrawingBoard, usePaintingState } from "./hooks";

export const DrawingBoard = () => {
    const {
        canvasElement,
        updateCanvasContext,
        handlers: {
            handleDraw,
            handleMouseDown,
            handleMouseUp,
            handleTouchStart,
            handleTouchEnd,
            handleMobileDraw,
        },
    } = useDrawingBoard();

    const { canvasContext, zoom } = useContext(DrawingContext);

    const {
        mutators: { resetPainting },
    } = usePaintingState();

    useEffect(() => {
        updateCanvasContext();
        if (canvasElement.current) {
            canvasElement.current.width = canvasElement.current.clientWidth;
            canvasElement.current.height = canvasElement.current.clientHeight;
            (canvasElement.current.getContext("2d") as any).fillStyle = "white";
            canvasElement.current
                .getContext("2d")
                ?.fillRect(
                    0,
                    0,
                    canvasElement.current.clientWidth,
                    canvasElement.current.clientHeight
                );
        }
    }, [canvasElement, updateCanvasContext]);

    useEffect(() => {
        const canvas = canvasElement.current;

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
    }, [canvasContext, canvasElement, handleMobileDraw, handleTouchEnd, handleTouchStart]);

    return (
        <canvas
            ref={canvasElement}
            onMouseDown={(e) => handleMouseDown(e)}
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseMove={(e) => handleDraw(e)}
            onMouseLeave={(e) => {
                handleDraw(e);
                resetPainting();
            }}
            id="canvasElement"
            className="absolute cursor-crosshair origin-top-left"
            style={{ width: "1920px", height: "1080px", transform: "scale(" + zoom + ")" }}
        ></canvas>
    );
};
