"use client";
import { useEffect } from "react";

import { useHistory } from "@/states/History";

import { ToolBar } from "./components";

export const DrawingPage = () => {
    const {
        currentHistoryIndex,
        mutator: { redrawHistory },
    } = useHistory();

    useEffect(() => {
        redrawHistory(currentHistoryIndex);
    }, [currentHistoryIndex]);

    return (
        <>
            <ToolBar></ToolBar>
            {/* Canvas */}
            {/* <div className="w-full h-full overflow-auto relative">
                <DrawingBoard></DrawingBoard>
            </div> */}
        </>
    );
};
