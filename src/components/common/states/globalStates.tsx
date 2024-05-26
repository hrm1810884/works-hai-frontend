"use client";

import React, { FC, useState } from "react";

import { DrawingContext } from "@/states/DrawingContext";
import { canvasContext, Brush, HistoryItem } from "@/model";

type Props = {
    children: React.ReactNode;
};

export const GlobalStateProvider: FC<Props> = ({ children }) => {
    const [canvasContext, setCanvasContext] = useState<canvasContext>(null);
    const [zoom, setZoom] = useState<number>(0.5);
    const [brush, setBrush] = useState<Brush>({ type: "PENCIL", width: 3, color: "#000000" });
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);

    return (
        <DrawingContext.Provider
            value={{
                canvasContext,
                setCanvasContext,
                zoom,
                setZoom,
                brush,
                setBrush,
                history,
                setHistory,
                currentHistoryIndex,
                setCurrentHistoryIndex,
            }}
        >
            {children}
        </DrawingContext.Provider>
    );
};
