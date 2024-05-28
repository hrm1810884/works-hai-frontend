"use client";
import { useEffect } from "react";

import { useHistory } from "@/states/History";

import { SendButton } from "./components/SendButton";

import { ToolBar, DrawingBoard } from "./components";

import { pageWrapperStyle, drawingWrapperStyle } from "./page.css";

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
            <SendButton></SendButton>
        </div>
    );
};
