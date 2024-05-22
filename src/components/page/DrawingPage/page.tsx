"use client";
import { useEffect } from "react";

import { useHistory } from "@/states/History";

import { styleUtils } from "@/styles";

import { ToolBar, DrawingBoard } from "./components";

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
            <div className={styleUtils.contentWrapper}>
                <ToolBar />
                <DrawingBoard />
            </div>
        </>
    );
};
