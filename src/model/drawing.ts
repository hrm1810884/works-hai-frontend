export type CanvasPoint = {
    x: number;
    y: number;
};

export type HistoryItem = {
    points: Array<CanvasPoint>;
    type: BrushType;
    width: number;
    color: string;
};

export type canvasContext = CanvasRenderingContext2D | undefined | null;

export type BrushType = "PENCIL" | "ERASER";

export const lineWidthData: Record<BrushType, Readonly<Array<number>>> = {
    PENCIL: [1, 3, 5, 7] as const,
    ERASER: [2, 4, 6, 8] as const,
};

export type lineWidth<T extends BrushType> = (typeof lineWidthData)[T][number];

export type Brush = {
    [T in BrushType]: {
        type: T;
        width: lineWidth<T>;
        color: string;
    };
}[BrushType];
