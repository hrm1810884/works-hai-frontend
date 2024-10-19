import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { BrushType, HistoryItem, HistoryManager, MAX_HISTORY_ITEMS } from "@/model";

import {
    createSnapshot,
    getCanvasContext,
    getLatestSnapshotIndex,
    getMinIndexAfterSnapshot,
    isClearCanvas,
} from "@/model/drawing.selector";
import { guardUndef } from "@/utils";

import { useCanvas } from "./Canvas";

const initHistory: HistoryItem<"PENCIL"> = {
    points: [],
    brush: { type: "PENCIL", width: 1, color: "white" },
};

const historyManagerAtom = atom<HistoryManager>({
    currentIndex: 0,
    historyItems: [initHistory] as HistoryItem<BrushType>[],
    snapshots: [],
});

export const useHistory = () => {
    const [historyManager, setHistoryManager] = useAtom(historyManagerAtom);

    const { currentIndex, historyItems, snapshots } = historyManager;

    const { canvasRef, clearCanvas } = useCanvas();

    const redrawHistory = useCallback(
        (manager: HistoryManager) => {
            const snapshotIndex = getLatestSnapshotIndex(manager.currentIndex);
            const toRedraw = manager.historyItems.slice(
                getMinIndexAfterSnapshot(snapshotIndex),
                manager.currentIndex + 1
            );

            const canvasContext = getCanvasContext(canvasRef.current);
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

                // 一つ前のスナップショットを描画
                if (snapshotIndex >= 0) {
                    canvasContext.putImageData(manager.snapshots[snapshotIndex].imageData, 0, 0);
                }

                // スナップショット以降の履歴を描画
                toRedraw.forEach((historyItem) => {
                    if (isClearCanvas(historyItem)) {
                        clearCanvas();
                    } else {
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
                    }
                });
            }
        },
        [canvasRef, clearCanvas]
    );

    const undoHistory = useCallback(() => {
        const newHistoryManager = {
            ...historyManager,
            currentIndex: historyManager.currentIndex - 1,
        };

        setHistoryManager(newHistoryManager);
        redrawHistory(newHistoryManager);
    }, [setHistoryManager, redrawHistory, historyManager]);

    const redoHistory = useCallback(() => {
        const newHistoryManager = {
            ...historyManager,
            currentIndex: historyManager.currentIndex + 1,
        };
        setHistoryManager(newHistoryManager);
        redrawHistory(newHistoryManager);
    }, [setHistoryManager, redrawHistory, historyManager]);

    const incrementHistory = useCallback(
        (newHistoryItem: HistoryItem<BrushType>) => {
            const newIndex = currentIndex + 1;
            const newSnapshots =
                newIndex % MAX_HISTORY_ITEMS === 0
                    ? [...snapshots, guardUndef(createSnapshot(canvasRef.current))]
                    : snapshots;
            setHistoryManager({
                currentIndex: newIndex,
                historyItems: [...historyItems.slice(0, newIndex), newHistoryItem],
                snapshots: newSnapshots,
            });
        },
        [snapshots, historyItems, setHistoryManager, currentIndex, canvasRef]
    );

    return {
        mutator: {
            undoHistory,
            redoHistory,
            incrementHistory,
            redrawHistory,
        },
        flag: {
            isOldestHistory: currentIndex === 0,
            isNewestHistory: currentIndex === historyItems.length - 1 || historyItems.length === 1,
        },
    };
};
