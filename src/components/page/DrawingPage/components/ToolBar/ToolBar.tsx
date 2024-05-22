import { useContext } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { BiPencil, BiEraser, BiRedo, BiUndo } from "react-icons/bi";

import { useBrush } from "@/states/Brush";
import { DrawingContext } from "@/states/DrawingContext";
import { useHistory } from "@/states/History";

import { ColorPicker, LineWidthMenu } from "../ToolButton";
import { ToolButton } from "../ToolButton/ToolButton";

import {
    barContainerStyle,
    buttonsContainerStyle,
    iconStyle,
    toolButtonsContainerStyle,
} from "./ToolBar.css";

export const ToolBar = () => {
    const { canvasContext } = useContext(DrawingContext);

    const {
        mutator: { undoHistory, redoHistory, initializeHistory },
        flag: { isNewestHistory, isOldestHistory },
    } = useHistory();

    const {
        brush,
        mutator: { setBrushType },
    } = useBrush();

    return (
        <div className={barContainerStyle}>
            {/* undo, redo, trash */}
            <div className={buttonsContainerStyle}>
                {/* Undo history */}
                <ToolButton
                    onClick={undoHistory}
                    icon={<BiUndo className={iconStyle}></BiUndo>}
                    isDisabled={isOldestHistory}
                ></ToolButton>

                {/* Redo history */}
                <ToolButton
                    onClick={redoHistory}
                    icon={<BiRedo className={iconStyle}></BiRedo>}
                    isDisabled={isNewestHistory}
                ></ToolButton>

                {/* Clear canvas */}
                <ToolButton
                    onClick={() => {
                        if (canvasContext) {
                            canvasContext.clearRect(
                                0,
                                0,
                                canvasContext.canvas.width,
                                canvasContext.canvas.height
                            );
                            canvasContext.fillStyle = "white";
                            canvasContext.fillRect(
                                0,
                                0,
                                canvasContext.canvas.width,
                                canvasContext.canvas.height
                            );
                        }
                        initializeHistory();
                    }}
                    icon={<AiOutlineClear className={iconStyle}></AiOutlineClear>}
                ></ToolButton>
            </div>

            {/* Tools */}
            <div className={toolButtonsContainerStyle}>
                {/* Pen */}
                <ToolButton
                    onClick={() => {
                        setBrushType("PENCIL");
                    }}
                    icon={<BiPencil className={iconStyle}></BiPencil>}
                    isSelected={brush.type === "PENCIL"}
                ></ToolButton>

                {/* Eraser */}
                <ToolButton
                    onClick={() => {
                        setBrushType("ERASER");
                    }}
                    icon={<BiEraser className={iconStyle}></BiEraser>}
                    isSelected={brush.type === "ERASER"}
                ></ToolButton>

                {/* Line width */}
                <LineWidthMenu></LineWidthMenu>

                {/* Color */}
                <ColorPicker></ColorPicker>
            </div>
        </div>
    );
};
