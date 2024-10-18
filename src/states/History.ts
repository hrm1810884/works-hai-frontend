import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { BrushType, CanvasSnapshot, HistoryItem, HistoryManager, MAX_HISTORY_ITEMS } from "@/model";

import { getLatestSnapshotIndex, getMinIndexAfterSnapshot } from "@/model/drawing.selector";
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
    const { canvasContext } = useCanvas();

    const { currentIndex, historyItems, snapshots } = historyManager;

    const createSnapshot = useCallback(() => {
        if (canvasContext) {
            const imageData = canvasContext.getImageData(
                0,
                0,
                canvasContext.canvas.width,
                canvasContext.canvas.height
            );
            return { imageData, timestamp: Date.now() } as CanvasSnapshot;
        }
    }, [canvasContext]);

    const initializeHistory = useCallback(() => {
        if (canvasContext) {
            canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);

            setHistoryManager({
                currentIndex: 0,
                historyItems: [initHistory],
                snapshots: [],
            });
        }
    }, [canvasContext, setHistoryManager]);

    const redrawHistory = useCallback(
        (manager: HistoryManager) => {
            const snapshotIndex = getLatestSnapshotIndex(manager.currentIndex);
            const toRedraw = manager.historyItems.slice(
                getMinIndexAfterSnapshot(snapshotIndex),
                manager.currentIndex + 1
            );
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
        [canvasContext]
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
                    ? [...snapshots, guardUndef(createSnapshot())]
                    : snapshots;
            setHistoryManager({
                currentIndex: newIndex,
                historyItems: [...historyItems.slice(0, newIndex), newHistoryItem],
                snapshots: newSnapshots,
            });
        },
        [snapshots, historyItems, setHistoryManager, currentIndex, createSnapshot]
    );

    return {
        mutator: {
            initializeHistory,
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
