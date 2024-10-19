import React, { useCallback, useState } from "react";

import { CanvasPoint } from "@/model";

import { useBrush } from "@/states/Brush";
import { useCanvas } from "@/states/Canvas";
import { useHistory } from "@/states/History";
import { guardUndef } from "@/utils";

export const usePaintingState = () => {
    const [painting, setPainting] = useState({
        isPainting: false,
        startX: 0,
        startY: 0,
    });

    const resetPainting = useCallback(() => {
        setPainting({ isPainting: false, startX: 0, startY: 0 });
    }, [setPainting]);

    const updatePainting = useCallback(
        (x: number, y: number) => {
            setPainting({ isPainting: true, startX: x, startY: y });
        },
        [setPainting]
    );

    return {
        painting,
        mutators: {
            resetPainting,
            updatePainting,
        },
    };
};

export const useDrawingCanvas = () => {
    const [points, setPoints] = useState(Array<CanvasPoint>());
    const { canvasRef, updateWhitePixelsProportion, getCanvasContext } = useCanvas();
    const { brush } = useBrush();

    const {
        mutator: { incrementHistory },
    } = useHistory();

    const {
        painting,
        mutators: { resetPainting, updatePainting },
    } = usePaintingState();

    const handleMouseDown = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
            e.preventDefault();

            const canvasContext = getCanvasContext(canvasRef.current);

            if (canvasContext && canvasRef?.current) {
                let rect = (e.target as HTMLElement).getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;

                updatePainting(x, y);

                setPoints([]);
            }
        },
        [canvasRef, getCanvasContext, updatePainting]
    );

    const handleDraw = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
            if (!painting.isPainting) return;

            let rect = (e.target as HTMLElement).getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            const canvasContext = getCanvasContext(canvasRef.current);

            if (canvasContext && canvasRef?.current) {
                setPoints([...points, { x: x, y: y }]);

                canvasContext.lineWidth = brush.width;
                if (brush.type === "PENCIL") {
                    canvasContext.strokeStyle = brush.color;
                } else if (brush.type === "ERASER") {
                    canvasContext.strokeStyle = "white";
                }
                canvasContext.lineCap = "round";
                canvasContext.lineJoin = "round";
                canvasContext.lineTo(x, y);
                canvasContext.stroke();
            }
        },
        [brush, canvasRef, getCanvasContext, painting, points]
    );

    const handleMouseUp = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
            handleDraw(e);

            let rect = (e.target as HTMLElement).getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            incrementHistory({
                points: [...points, { x: x, y: y }],
                brush: {
                    type: brush.type,
                    color: brush.color,
                    width: brush.width,
                },
            });

            resetPainting();

            setPoints([]);

            const canvasContext = getCanvasContext(canvasRef.current);

            if (canvasContext) {
                canvasContext.stroke();
                canvasContext.beginPath();
            }

            updateWhitePixelsProportion(guardUndef(canvasRef.current));
        },
        [
            brush,
            canvasRef,
            getCanvasContext,
            incrementHistory,
            handleDraw,
            points,
            resetPainting,
            updateWhitePixelsProportion,
        ]
    );

    const handleTouchStart = useCallback(
        (e: TouchEvent) => {
            const canvasContext = getCanvasContext(canvasRef.current);

            if (canvasContext && canvasRef?.current) {
                let rect = (e.target as HTMLElement).getBoundingClientRect();
                if (e.touches.length === 1) {
                    e.preventDefault();
                    let x = e.touches[0].clientX - rect.left;
                    let y = e.touches[0].clientY - rect.top;

                    updatePainting(x, y);

                    setPoints([]);
                }
            }
        },
        [canvasRef, getCanvasContext, updatePainting]
    );

    const handleMobileDraw = useCallback(
        (e: TouchEvent) => {
            if (!painting.isPainting) return;

            let rect = (e.target as HTMLElement).getBoundingClientRect();

            if (e.touches.length === 1) {
                e.preventDefault();
                let x = e.touches[0].clientX - rect.left;
                let y = e.touches[0].clientY - rect.top;

                const canvasContext = getCanvasContext(canvasRef.current);

                if (canvasContext && canvasRef?.current) {
                    setPoints([...points, { x: x, y: y }]);

                    canvasContext.lineWidth = brush.width;
                    if (brush.type === "PENCIL") {
                        canvasContext.strokeStyle = brush.color;
                    } else if (brush.type === "ERASER") {
                        canvasContext.strokeStyle = "white";
                    }
                    canvasContext.lineCap = "round";
                    canvasContext.lineJoin = "round";
                    canvasContext.lineTo(x, y);
                    canvasContext.stroke();
                }
            }
        },
        [brush, canvasRef, getCanvasContext, painting, points]
    );

    const handleTouchEnd = useCallback(
        (e: TouchEvent) => {
            console.log(e.touches);

            handleMobileDraw(e);
            e.preventDefault();

            incrementHistory({
                points: [...points],
                brush: {
                    type: brush.type,
                    color: brush.color,
                    width: brush.width,
                },
            });

            resetPainting();

            setPoints([]);

            const canvasContext = getCanvasContext(canvasRef.current);

            if (canvasContext) {
                canvasContext.stroke();
                canvasContext.beginPath();
            }

            updateWhitePixelsProportion(guardUndef(canvasRef.current));
        },
        [
            brush,
            canvasRef,
            getCanvasContext,
            incrementHistory,
            handleMobileDraw,
            points,
            resetPainting,
            updateWhitePixelsProportion,
        ]
    );

    return {
        handlers: {
            handleMouseDown,
            handleDraw,
            handleMouseUp,
            handleTouchStart,
            handleMobileDraw,
            handleTouchEnd,
        },
    };
};
