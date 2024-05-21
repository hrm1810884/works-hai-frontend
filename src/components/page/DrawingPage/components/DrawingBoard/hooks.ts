import React, { useState, useContext, useRef, useCallback } from "react";

import { DrawingContext } from "@/states/DrawingContext";
import { useHistory } from "@/states/History";
import { CanvasPoint } from "@/types";

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

export const useDrawingBoard = () => {
    const [points, setPoints] = useState(Array<CanvasPoint>());

    const { brush, canvasContext, setCanvasContext, zoom } = useContext(DrawingContext);

    const {
        flag: { isNewestHistory },
        mutator: { initializeHistory, inclementHistory },
    } = useHistory();

    const {
        painting,
        mutators: { resetPainting, updatePainting },
    } = usePaintingState();

    const canvasElement = useRef<HTMLCanvasElement>(null);

    const updateCanvasContext = useCallback(() => {
        setCanvasContext(canvasElement.current?.getContext("2d"));
    }, [setCanvasContext]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        e.preventDefault();

        if (canvasContext && canvasElement.current) {
            // Reset history
            if (!isNewestHistory) {
                initializeHistory();
            }

            let rect = (e.target as HTMLElement).getBoundingClientRect();
            let x = (e.clientX - rect.left) / zoom;
            let y = (e.clientY - rect.top) / zoom;

            updatePainting(x, y);

            setPoints([]);
        }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        handleDraw(e);

        let rect = (e.target as HTMLElement).getBoundingClientRect();
        let x = (e.clientX - rect.left) / zoom;
        let y = (e.clientY - rect.top) / zoom;

        inclementHistory({
            type: brush.type,
            color: brush.color,
            width: brush.width,
            points: [...points, { x: x, y: y }],
        });

        resetPainting();

        setPoints([]);
        if (canvasContext) {
            canvasContext.stroke();
            canvasContext.beginPath();
        }
    };

    const handleDraw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!painting.isPainting) return;

        let rect = (e.target as HTMLElement).getBoundingClientRect();
        let x = (e.clientX - rect.left) / zoom;
        let y = (e.clientY - rect.top) / zoom;

        if (canvasContext && canvasElement.current) {
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
    };

    const handleTouchStart = (e: TouchEvent) => {
        if (canvasContext && canvasElement.current) {
            let rect = (e.target as HTMLElement).getBoundingClientRect();
            if (e.touches.length === 1) {
                // Reset redo option
                if (!isNewestHistory) {
                    initializeHistory();
                }

                e.preventDefault();
                let x = (e.touches[0].clientX - rect.left) / zoom;
                let y = (e.touches[0].clientY - rect.top) / zoom;

                updatePainting(x, y);

                setPoints([]);
            }
        }
    };

    const handleMobileDraw = (e: TouchEvent) => {
        if (!painting.isPainting) return;

        let rect = (e.target as HTMLElement).getBoundingClientRect();

        if (e.touches.length === 1) {
            e.preventDefault();
            let x = (e.touches[0].clientX - rect.left) / zoom;
            let y = (e.touches[0].clientY - rect.top) / zoom;

            if (canvasContext && canvasElement.current) {
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
    };

    const handleTouchEnd = (e: TouchEvent) => {
        console.log(e.touches);

        handleMobileDraw(e);
        e.preventDefault();

        inclementHistory({
            type: brush.type,
            color: brush.color,
            width: brush.width,
            points: [...points],
        });

        resetPainting();

        setPoints([]);
        if (canvasContext) {
            canvasContext.stroke();
            canvasContext.beginPath();
        }
    };

    return {
        canvasElement,
        updateCanvasContext,
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
