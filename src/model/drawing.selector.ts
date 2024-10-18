import { HistoryManager, MAX_HISTORY_ITEMS } from "./drawing";

export function getLatestSnapshotIndex(manager: HistoryManager) {
    return Math.floor(manager.currentIndex / MAX_HISTORY_ITEMS) - 1;
}
