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

export const lineWidthList = [1, 3, 5, 8] as const;

export type lineWidth = (typeof lineWidthList)[number];

export type Brush = {
    type: BrushType;
    width: lineWidth;
    color: string;
};
