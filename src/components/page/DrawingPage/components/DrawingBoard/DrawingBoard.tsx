import { useInitService } from "@/usecase";

import { AiDrawing } from "./AiDrawing";
import { Canvas } from "./Canvas";

import {
    drawingBoardContainerStyle,
    horizontalDrawingContainerStyle,
    verticalDrawingContainerStyle,
} from "./DrawingBoard.css";

export const DrawingBoard = () => {
    const { aiSrc } = useInitService();
    return (
        <div className={drawingBoardContainerStyle}>
            <div className={verticalDrawingContainerStyle({ position: "top" })}>
                <AiDrawing pos="top" src={aiSrc["top"]} />
            </div>
            <div className={horizontalDrawingContainerStyle}>
                <AiDrawing pos="left" src={aiSrc["left"]} />
                <Canvas />
                <AiDrawing pos="right" src={aiSrc["right"]} />
            </div>
            <div className={verticalDrawingContainerStyle({ position: "bottom" })}>
                <AiDrawing pos="bottom" src={aiSrc["bottom"]} />
            </div>
        </div>
    );
};
