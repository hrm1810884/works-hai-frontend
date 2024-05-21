import { useContext } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { BiPencil, BiEraser, BiRedo, BiUndo } from "react-icons/bi";
import { BsBorderWidth } from "react-icons/bs";

import { DrawingContext } from "@/states/DrawingContext";
import { useHistory } from "@/states/History";
import { BrushType } from "@/types";

import { LineWidthModalContent } from "../ToolButton/modalContents";
import { ColorModalContent } from "../ToolButton/modalContents/ColorModalContent";
import { ToolButton } from "../ToolButton/ToolButton";
import { ToolButtonWithModal } from "../ToolButton/ToolButtonWithModal";

import {
    barContainer,
    buttonContainer,
    colorPaletteIcon,
    toolButtonContainer,
} from "./ToolBar.css";

export const ToolBar = () => {
    const { canvasContext, brush, setBrush } = useContext(DrawingContext);

    const {
        mutator: { undoHistory, redoHistory, initializeHistory },
        flag: { isNewestHistory, isOldestHistory },
    } = useHistory();

    const setBrushType = (type: BrushType) => {
        if (type) {
            setBrush({
                width: brush.width,
                type: type,
                color: brush.color,
            });
        }
    };

    return (
        <div className={barContainer}>
            {/* Save, undo, redo */}
            <div className={buttonContainer}>
                {/* Undo history */}
                <ToolButton
                    onClick={undoHistory}
                    icon={
                        <BiUndo
                        // className={
                        //     "icon-accessibility " +
                        //     (history.length === currentHistoryIndex && "icon-inactive")
                        // }
                        ></BiUndo>
                    }
                    isDisabled={isOldestHistory}
                ></ToolButton>

                {/* Redo history */}
                <ToolButton
                    onClick={redoHistory}
                    icon={
                        <BiRedo
                        // className={
                        //     "icon-accessibility " +
                        //     (currentHistoryIndex === 0 && "icon-inactive")
                        // }
                        ></BiRedo>
                    }
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
                    icon={<AiOutlineClear className="icon-accessibility"></AiOutlineClear>}
                ></ToolButton>
            </div>

            {/* Tools */}
            <div className={toolButtonContainer}>
                {/* Pen */}
                <ToolButton
                    onClick={() => setBrushType("PENCIL")}
                    icon={<BiPencil className="icon-accessibility"></BiPencil>}
                ></ToolButton>

                {/* Eraser */}
                <ToolButton
                    onClick={() => setBrushType("ERASER")}
                    icon={<BiEraser className="icon-accessibility"></BiEraser>}
                ></ToolButton>

                {/* Fill */}
                {/* <ToolButton icon={<RiPaintLine className='icon-accessibility icon-inactive'></RiPaintLine>}></ToolButton> */}

                {/* Line width */}
                <ToolButtonWithModal
                    icon={<BsBorderWidth className="icon-accessibility"></BsBorderWidth>}
                    modalContent={<LineWidthModalContent></LineWidthModalContent>}
                ></ToolButtonWithModal>

                {/* Color */}
                <ToolButtonWithModal
                    icon={
                        <div
                            className={colorPaletteIcon}
                            style={{ backgroundColor: brush.color }}
                        ></div>
                    }
                    modalContent={<ColorModalContent></ColorModalContent>}
                ></ToolButtonWithModal>
            </div>
        </div>
    );
};
