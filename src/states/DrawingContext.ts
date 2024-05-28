/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Dispatch, RefObject, SetStateAction, createContext } from "react";

import { Brush, HistoryItem, canvasContext } from "@/model";

interface DrawingContextInterface {
    canvasRef: RefObject<HTMLCanvasElement> | null;
    canvasContext: canvasContext;
    setCanvasContext: Dispatch<SetStateAction<canvasContext>>;
    brush: Brush;
    setBrush: Dispatch<SetStateAction<Brush>>;
    history: HistoryItem[];
    setHistory: Dispatch<SetStateAction<HistoryItem[]>>;
    currentHistoryIndex: number;
    setCurrentHistoryIndex: Dispatch<SetStateAction<number>>;
}

export const DrawingContext = createContext<DrawingContextInterface>({
    canvasRef: null,
    canvasContext: null,
    setCanvasContext: () => {},
    brush: { type: "PENCIL", width: 3, color: "#000000" },
    setBrush: () => {},
    history: [],
    setHistory: () => {},
    currentHistoryIndex: 0,
    setCurrentHistoryIndex: () => {},
});
