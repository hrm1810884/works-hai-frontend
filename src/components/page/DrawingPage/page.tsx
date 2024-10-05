"use client";
import { useEffect } from "react";

import { useHistory } from "@/states/History";
import { useModal } from "@/states/Modal";

import { GenerationButton } from "./components/GenerationButton";

import { DrawingBoard, GenerationModal, ToolBar, BottomToolBar } from "./components";

import { drawingWrapperStyle, generationButtonWrapperStyle, pageWrapperStyle, BottomAreaWrapperStyle } from "./page.css";

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
                <BottomToolBar onClick={openModal}/>
            </div>
        </>
    );
};
