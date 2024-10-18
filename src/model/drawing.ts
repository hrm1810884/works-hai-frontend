export type CanvasPoint = {
    x: number;
    y: number;
};

export type canvasContext = CanvasRenderingContext2D | undefined | null;

export type BrushType = "PENCIL" | "ERASER";

export const lineWidthData = {
    PENCIL: [1, 3, 5, 7],
    ERASER: [2, 4, 6, 8],
} as const satisfies Record<BrushType, number[]>;

export type LineWidth<T extends BrushType> = (typeof lineWidthData)[T][number];

export type Brush<T extends BrushType> = {
    type: T;
    width: LineWidth<T>;
    color: string;
};

/**
 * 履歴を表すモデル
 */

export const MAX_HISTORY_ITEMS = 10 as const;

// 履歴の1つの要素
export type HistoryItem<B extends BrushType> = {
    points: CanvasPoint[];
    brush: Brush<B>;
};

// キャンバスのスナップショット
export type CanvasSnapshot = {
    imageData: ImageData;
    timestamp: number; // スナップショットが作成された時刻
};

// 履歴管理用の型
export type HistoryManager = {
    currentIndex: number; // 現在の履歴のインデックス
    historyItems: HistoryItem<BrushType>[];
    snapshots: CanvasSnapshot[]; // スナップショット（履歴を10件ごとに保存）
};
