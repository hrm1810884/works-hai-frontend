"use client";
import { useEffect } from "react";

import { useHistory } from "@/states/History";

import { ToolBar, DrawingBoard } from "./components";

import { wrapper } from "./page.css";

export const DrawingPage = () => {
    const {
        currentHistoryIndex,
        mutator: { redrawHistory },
    } = useHistory();

    useEffect(() => {
        redrawHistory(currentHistoryIndex);
    }, [currentHistoryIndex, redrawHistory]);

    return (
        <>
            <div className={wrapper}>
                <ToolBar />
                <DrawingBoard />
            </div>
        </>
    );
};
