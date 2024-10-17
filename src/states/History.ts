import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { BrushType, HistoryItem } from "@/model";

import { useCanvas } from "./Canvas";

const initHistory: HistoryItem<"PENCIL"> = {
    points: [],
    brush: { type: "PENCIL", width: 1, color: "white" },
};
const historyAtom = atom<HistoryItem<BrushType>[]>([initHistory]);
const currentHistoryIndexAtom = atom<number>(0);
export const useHistory = () => {
    const [history, setHistory] = useAtom(historyAtom);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useAtom(currentHistoryIndexAtom);
    const { canvasContext, calculateWhitePixelsProportion } = useCanvas();

    const initializeHistory = useCallback(() => {
        if (canvasContext) {
            canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
        }
        setHistory([initHistory]);
        setCurrentHistoryIndex(0);

        calculateWhitePixelsProportion();
    }, [canvasContext, setHistory, setCurrentHistoryIndex, calculateWhitePixelsProportion]);

    const isOldestHistory = useCallback(() => currentHistoryIndex === 0, [currentHistoryIndex]);
    const isNewestHistory = useCallback(
        () => currentHistoryIndex === history.length - 1 || history.length === 1,
        [currentHistoryIndex, history]
    );

    const redrawHistory = useCallback(
        (index: number) => {
            const toRedraw = history.slice(0, index + 1);
            if (canvasContext) {
                canvasContext.clearRect(
                    0,
                    0,
                    canvasContext.canvas.width,
                    canvasContext.canvas.height
                );
                canvasContext.fillStyle = "white";
                canvasContext.fillRect(
                    0,
                    0,
                    canvasContext.canvas.width,
                    canvasContext.canvas.height
                );

                toRedraw.forEach((historyItem) => {
                    canvasContext.lineWidth = historyItem.brush.width;
                    if (historyItem.brush.type === "PENCIL") {
                        canvasContext.strokeStyle = historyItem.brush.color;
                    } else if (historyItem.brush.type === "ERASER") {
                        canvasContext.strokeStyle = "white";
                    }
                    canvasContext.lineCap = "round";
                    canvasContext.lineJoin = "round";
                    historyItem.points.forEach((point) => {
                        canvasContext.lineTo(point.x, point.y);
                        canvasContext.stroke();
                    });
                    canvasContext.stroke();
                    canvasContext.beginPath();
                });
            }
        },
        [history, canvasContext]
    );

    const undoHistory = useCallback(() => {
        const newIndex = currentHistoryIndex - 1;
        setCurrentHistoryIndex(newIndex);
        redrawHistory(newIndex);
    }, [setCurrentHistoryIndex, redrawHistory, currentHistoryIndex]);

    const redoHistory = useCallback(() => {
        const newIndex = currentHistoryIndex + 1;
        setCurrentHistoryIndex(newIndex);
        redrawHistory(newIndex);
    }, [setCurrentHistoryIndex, redrawHistory, currentHistoryIndex]);

    const incrementHistory = useCallback(
        (newHistoryItem: HistoryItem<BrushType>) => {
            const prevHistory = history.slice(0, currentHistoryIndex + 1);
            setHistory([...prevHistory, newHistoryItem]);
            setCurrentHistoryIndex((prev) => prev + 1);
        },
        [history, setHistory, currentHistoryIndex, setCurrentHistoryIndex]
    );

    const trashUnnecessaryHistory = useCallback(() => {
        setHistory(history.slice(0, currentHistoryIndex + 1));
    }, [history, setHistory, currentHistoryIndex]);

    return {
        history,
        currentHistoryIndex,
        mutator: {
            initializeHistory,
            undoHistory,
            redoHistory,
            incrementHistory,
            trashUnnecessaryHistory,
            redrawHistory,
        },
        flag: {
            isOldestHistory,
            isNewestHistory,
        },
    };
};
