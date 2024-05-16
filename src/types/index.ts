export type CanvasPoint = {
    x: number;
    y: number;
};

export type HistoryItem = {
    points: Array<CanvasPoint>;
    type: string;
    color: string;
    width: number;
};

export type canvasContext = CanvasRenderingContext2D | undefined | null;

export type BrushType = "PENCIL" | "ERASER";

export type lineWidth = 1 | 3 | 5 | 8;

export type Brush = {
    type: BrushType;
    width: lineWidth;
    color: string;
};
