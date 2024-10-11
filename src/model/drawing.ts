export type CanvasPoint = {
    x: number;
    y: number;
};

export type HistoryItem<B extends BrushType> = {
    points: CanvasPoint[];
    brush: Brush<B>; // Brush<B> で型引数を渡す
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
