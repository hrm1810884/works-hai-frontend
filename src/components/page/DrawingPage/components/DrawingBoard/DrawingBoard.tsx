import { AiDrawing } from "./AiDrawing";
import { Canvas } from "./Canvas";

import {
    drawingBoardContainerStyle,
    horizontalDrawingContainerStyle,
    verticalDrawingContainerStyle,
} from "./DrawingBoard.css";

export const DrawingBoard = () => {
    return (
        <div className={drawingBoardContainerStyle}>
            <div className={verticalDrawingContainerStyle({ position: "top" })}>
                <AiDrawing position="top"></AiDrawing>
            </div>
            <div className={horizontalDrawingContainerStyle}>
                <AiDrawing position="left"></AiDrawing>
                <Canvas />
                <AiDrawing position="right"></AiDrawing>
            </div>
            <div className={verticalDrawingContainerStyle({ position: "bottom" })}>
                <AiDrawing position="bottom"></AiDrawing>
            </div>
        </div>
    );
};
