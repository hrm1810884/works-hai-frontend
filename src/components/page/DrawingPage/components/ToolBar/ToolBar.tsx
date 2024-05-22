import { useContext } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { BiPencil, BiEraser, BiRedo, BiUndo } from "react-icons/bi";
import { BsBorderWidth } from "react-icons/bs";

import { useBrush } from "@/states/Brush";
import { DrawingContext } from "@/states/DrawingContext";
import { useHistory } from "@/states/History";

import { LineWidthModalContent } from "../ToolButton/modalContents";
import { ColorModalContent } from "../ToolButton/modalContents/ColorModalContent";
import { ToolButton } from "../ToolButton/ToolButton";
import { ToolButtonWithModal } from "../ToolButton/ToolButtonWithModal";

import {
    barContainerStyle,
    buttonsContainerStyle,
    colorPaletteIcon,
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
                <ToolButtonWithModal
                    icon={<BsBorderWidth className={iconStyle}></BsBorderWidth>}
                    modalContent={<LineWidthModalContent></LineWidthModalContent>}
                ></ToolButtonWithModal>

                {/* Color */}
                <ToolButtonWithModal
                    icon={
                        <div
                            className={`${colorPaletteIcon} ${iconStyle}`}
                            style={{ backgroundColor: brush.color }}
                        ></div>
                    }
                    modalContent={<ColorModalContent></ColorModalContent>}
                ></ToolButtonWithModal>
            </div>
        </div>
    );
};
