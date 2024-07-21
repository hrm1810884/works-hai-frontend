"use client";
import { useEffect } from "react";

import { useHistory } from "@/states/History";

import { GenerationButton } from "./components/GenerationButton";

import { ToolBar, DrawingBoard } from "./components";

import { pageWrapperStyle, drawingWrapperStyle, generationButtonWrapperStyle } from "./page.css";

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
                <DrawingBoard></DrawingBoard>
            </div>
            <div className={generationButtonWrapperStyle}>
                <GenerationButton />
            </div>
        </div>
    );
};
