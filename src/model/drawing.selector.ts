import { MAX_HISTORY_ITEMS } from "./drawing";

export function getMinIndexAfterSnapshot(snapshotIndex: number) {
    return (snapshotIndex + 1) * MAX_HISTORY_ITEMS;
}

export function getLatestSnapshotIndex(historyIndex: number) {
    return Math.floor(historyIndex / MAX_HISTORY_ITEMS) - 1;
}
