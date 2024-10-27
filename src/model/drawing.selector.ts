import { guardUndef } from "@/utils";

import {
    CanvasSnapshot,
    DRAWN_THRESHOLD,
    HistoryItem,
    MAX_HISTORY_ITEMS,
    WhitePixelsProportion,
} from "./drawing";

export function getMinIndexAfterSnapshot(snapshotIndex: number) {
    return (snapshotIndex + 1) * MAX_HISTORY_ITEMS;
}

export function getLatestSnapshotIndex(historyIndex: number) {
    return Math.floor(historyIndex / MAX_HISTORY_ITEMS) - 1;
}

export function isClearCanvas(history: HistoryItem) {
    return history.points.length === 0;
}

/**
 * 描画割合が DRAWN_THRESHOLD 以上かどうかを判定する
 * @param whitePixelsProportion
 * @returns
 */
export function isDrawnValidly(whitePixelsProportion: WhitePixelsProportion) {
    return whitePixelsProportion < 1 - DRAWN_THRESHOLD;
}

export function getCanvasContext(
    canvas: HTMLCanvasElement | null
): CanvasRenderingContext2D | null {
    return guardUndef(canvas).getContext("2d");
}

export function createSnapshot(canvas: HTMLCanvasElement | null) {
    const canvasContext = getCanvasContext(guardUndef(canvas));
    if (canvasContext) {
        const imageData = canvasContext.getImageData(
            0,
            0,
            canvasContext.canvas.width,
            canvasContext.canvas.height
        );
        return { imageData, timestamp: Date.now() } as CanvasSnapshot;
    }
}
