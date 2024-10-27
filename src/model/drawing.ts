export type CanvasPoint = {
    x: number;
    y: number;
};

export type canvasContext = CanvasRenderingContext2D | undefined | null;

export type BrushType = "PENCIL" | "ERASER";

export const lineWidthData = {
    PENCIL: [1, 3, 5, 7] as const,
    ERASER: [2, 4, 6, 8] as const,
} as const satisfies Record<BrushType, number[]>;

export type LineWidth<T extends BrushType> = (typeof lineWidthData)[T][number];

export type Brush = {
    type: BrushType;
    width: {
        [K in BrushType]: LineWidth<K>; //NOTE: どちらの描画モードでも全てのモードの幅を持つ
    };
    color: string;
};

/**
 * MEMO: Brand にしてもいいかも
 */
export const DRAWN_THRESHOLD = 0.7 as const;
export type WhitePixelsProportion = number;

/**
 * 履歴を表すモデル
 */

export const MAX_HISTORY_ITEMS = 10 as const;

// 履歴の1つの要素
export type HistoryItem = {
    points: CanvasPoint[];
    brush: Brush;
};

// キャンバスのスナップショット
export type CanvasSnapshot = {
    imageData: ImageData;
    timestamp: number; // スナップショットが作成された時刻
};

// 履歴管理用の型
export type HistoryManager = {
    currentIndex: number; // 現在の履歴のインデックス
    historyItems: HistoryItem[];
    snapshots: CanvasSnapshot[]; // スナップショット（履歴を10件ごとに保存）
};
