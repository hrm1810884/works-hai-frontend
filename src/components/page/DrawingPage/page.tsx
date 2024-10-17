"use client";
import { useEffect } from "react";

import { useHistory } from "@/states/History";
import { useModal } from "@/states/Modal";

import { BottomToolBar, DrawingBoard, GenerationModal, ToolBar } from "./components";

import { drawingWrapperStyle, pageWrapperStyle } from "./page.css";

export const DrawingPage = () => {
    const {
        currentHistoryIndex,
        mutator: { redrawHistory },
    } = useHistory();

    const {
        isOpen,
        mutator: { openModal, closeModal },
    } = useModal();

    useEffect(() => {
        console.log(currentHistoryIndex);
    }, [currentHistoryIndex, redrawHistory]);

    return (
        <>
            <GenerationModal isOpen={isOpen} onClose={closeModal} />
            <div className={pageWrapperStyle}>
                <ToolBar />
                <div className={drawingWrapperStyle}>
                    <DrawingBoard />
                </div>
                <BottomToolBar onClick={openModal} />
            </div>
        </>
    );
};
