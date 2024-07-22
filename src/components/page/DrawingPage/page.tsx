"use client";
import { useEffect } from "react";

import { useHistory } from "@/states/History";
import { useModal } from "@/states/Modal";

import { GenerationButton } from "./components/GenerationButton";

import { DrawingBoard, GenerationModal, ToolBar } from "./components";

import { drawingWrapperStyle, generationButtonWrapperStyle, pageWrapperStyle } from "./page.css";

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
        redrawHistory(currentHistoryIndex);
    }, [currentHistoryIndex, redrawHistory]);

    return (
        <>
            <GenerationModal isOpen={isOpen} onClose={closeModal} />
            <div className={pageWrapperStyle}>
                <ToolBar />
                <div className={drawingWrapperStyle}>
                    <DrawingBoard />
                </div>
                <div className={generationButtonWrapperStyle}>
                    <GenerationButton text="完了" onClick={openModal} />
                </div>
            </div>
        </>
    );
};
