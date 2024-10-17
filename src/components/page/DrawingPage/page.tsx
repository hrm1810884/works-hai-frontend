"use client";

import { useModal } from "@/states/Modal";

import { BottomToolBar, DrawingBoard, GenerationModal, ToolBar } from "./internal";

import { drawingWrapperStyle, pageWrapperStyle } from "./page.css";

export const DrawingPage = () => {
    const {
        isOpen,
        mutator: { openModal, closeModal },
    } = useModal();

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
