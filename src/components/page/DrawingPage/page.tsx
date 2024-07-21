"use client";
import { useEffect } from "react";

import { useHistory } from "@/states/History";

import { GenerationButton } from "./components/GenerationButton";

import { DrawingBoard, ToolBar } from "./components";

import { drawingWrapperStyle, generationButtonWrapperStyle, pageWrapperStyle } from "./page.css";

export const DrawingPage = () => {
    const {
        currentHistoryIndex,
        mutator: { redrawHistory },
    } = useHistory();

    useEffect(() => {
        redrawHistory(currentHistoryIndex);
    }, [currentHistoryIndex, redrawHistory]);

    return (
        <div className={pageWrapperStyle}>
            <ToolBar />
            <div className={drawingWrapperStyle}>
                <DrawingBoard />
            </div>
            <div className={generationButtonWrapperStyle}>
                <GenerationButton />
            </div>
        </div>
    );
};
