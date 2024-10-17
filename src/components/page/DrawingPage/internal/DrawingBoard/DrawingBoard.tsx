import { useInitService } from "@/usecase";

import { AiDrawing } from "./AiDrawing";
import { Canvas } from "./Canvas";

import { drawingBoardContainerStyle, imageAlignStyle } from "./DrawingBoard.css";

export const DrawingBoard = () => {
    const { aiSrc } = useInitService();
    return (
        <div className={drawingBoardContainerStyle}>
            <AiDrawing
                pos="top"
                src={aiSrc["top"]}
                className={imageAlignStyle({ position: "top" })}
            />
            <AiDrawing
                pos="left"
                src={aiSrc["left"]}
                className={imageAlignStyle({ position: "middleLeft" })}
            />
            <Canvas className={imageAlignStyle({ position: "middleCenter" })} />
            <AiDrawing
                pos="right"
                src={aiSrc["right"]}
                className={imageAlignStyle({ position: "middleRight" })}
            />
            <AiDrawing
                pos="bottom"
                src={aiSrc["bottom"]}
                className={imageAlignStyle({ position: "bottom" })}
            />
        </div>
    );
};
