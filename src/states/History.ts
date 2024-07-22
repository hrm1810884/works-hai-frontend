import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { HistoryItem } from "@/model";

import { useCanvas } from "./Canvas";

const historyAtom = atom<HistoryItem[]>([]);
const currentHistoryIndexAtom = atom<number>(0);
export const useHistory = () => {
    const [history, setHistory] = useAtom(historyAtom);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useAtom(currentHistoryIndexAtom);
    const { canvasContext } = useCanvas();

    const initializeHistory = useCallback(() => {
        if (canvasContext) {
            canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
        }
        setHistory([]);
        setCurrentHistoryIndex(0);
    }, [canvasContext, setHistory, setCurrentHistoryIndex]);

    const isOldestHistory = currentHistoryIndex === history.length;
    const isNewestHistory = currentHistoryIndex === 0;

    const undoHistory = useCallback(() => {
        setCurrentHistoryIndex((prev) => prev + 1);
    }, [setCurrentHistoryIndex]); //NOTE: historyの構造上インデックスが増えるほど過去となる
    const redoHistory = useCallback(() => {
        setCurrentHistoryIndex((prev) => prev - 1);
    }, [setCurrentHistoryIndex]);

    const incrementHistory = useCallback(
        (newHistoryItem: HistoryItem) => {
            setHistory([newHistoryItem, ...history]);
        },
        [history, setHistory]
    );

    const trashUnnecessaryHistory = useCallback(() => {
        setHistory(history.slice(currentHistoryIndex));
    }, [history, setHistory, currentHistoryIndex]);

    const redrawHistory = useCallback(
        (index: number) => {
            const toRedraw = history.slice(index);
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

                toRedraw.reverse().forEach((historyItem) => {
                    canvasContext.lineWidth = historyItem.width;
                    if (historyItem.type === "PENCIL") {
                        canvasContext.strokeStyle = historyItem.color;
                    } else if (historyItem.type === "ERASER") {
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
