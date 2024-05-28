"use client";

import React, { FC, useRef, useState } from "react";

import { canvasContext, Brush, HistoryItem } from "@/model";

import { DrawingContext } from "@/states/DrawingContext";

type Props = {
    children: React.ReactNode;
};

export const GlobalStateProvider: FC<Props> = ({ children }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasContext, setCanvasContext] = useState<canvasContext>(null);
    const [brush, setBrush] = useState<Brush>({ type: "PENCIL", width: 3, color: "#000000" });
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);

    return (
        <DrawingContext.Provider
            value={{
                canvasRef,
                canvasContext,
                setCanvasContext,
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
