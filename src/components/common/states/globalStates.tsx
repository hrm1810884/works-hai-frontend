"use client";

import React, { FC, useRef, useState } from "react";

import { Brush, canvasContext, HistoryItem } from "@/model";

import { DrawingContext } from "@/states/DrawingContext";

type Props = {
    children: React.ReactNode;
};

export const GlobalStateProvider: FC<Props> = ({ children }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const userIdRef = useRef<string | null>(null);
    const saveUrlRef = useRef<string | null>(null);
    const [canvasContext, setCanvasContext] = useState<canvasContext>(null);
    const [brush, setBrush] = useState<Brush>({ type: "PENCIL", width: 3, color: "#000000" });
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);

    return (
        <DrawingContext.Provider
            value={{
                canvasRef,
                userIdRef,
                saveUrlRef,
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
