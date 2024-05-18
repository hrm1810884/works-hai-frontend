import { useContext } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { BiPencil, BiEraser, BiRedo, BiUndo } from "react-icons/bi";

// import { BsBorderWidth } from 'react-icons/bs'
import { DrawingContext } from "@/states/DrawingContext";
import { BrushType } from "@/types";

import { ToolButton } from "../ToolButton/ToolButton";

export const ToolBar = () => {
    const {
        canvasContext,
        brush,
        setBrush,
        currentHistoryIndex,
        setCurrentHistoryIndex,
        history,
        setHistory,
    } = useContext(DrawingContext);
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
        <div className="w-full py-2 md:py-0 h-32 md:h-12 bg-neutral-100 border-b border-neutral-300 px-5 flex flex-col md:flex-row justify-between items-center text-neutral-600 z-50">
            {/* Save, undo, redo */}
            <div className="flex h-full gap-3 justify-center items-center">
                {/* Undo history */}
                <ToolButton
                    onClick={() =>
                        history.length !== currentHistoryIndex &&
                        setCurrentHistoryIndex(currentHistoryIndex + 1)
                    }
                    icon={
                        <BiUndo
                            className={
                                "icon-accessibility " +
                                (history.length === currentHistoryIndex && "icon-inactive")
                            }
                        ></BiUndo>
                    }
                ></ToolButton>

                {/* Redo history */}
                <ToolButton
                    onClick={() =>
                        currentHistoryIndex > 0 && setCurrentHistoryIndex(currentHistoryIndex - 1)
                    }
                    icon={
                        <BiRedo
                            className={
                                "icon-accessibility " +
                                (currentHistoryIndex === 0 && "icon-inactive")
                            }
                        ></BiRedo>
                    }
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
                        setHistory([]);
                        setCurrentHistoryIndex(0);
                    }}
                    icon={<AiOutlineClear className="icon-accessibility"></AiOutlineClear>}
                ></ToolButton>
            </div>

            {/* Tools */}
            <div className="flex h-full gap-3 justify-center items-center order-3 md:order-none">
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
                {/* <ToolButton icon={<BsBorderWidth className='icon-accessibility'></BsBorderWidth>} modal={<LineWidthModal></LineWidthModal>}></ToolButton> */}

                {/* Color */}
                {/* <ToolButton icon={<div className='h-6 w-6 border border-neutral-300 rounded-lg cursor-pointer' style={{ backgroundColor: brush.color}}></div>} modal={<ColorModal></ColorModal>}></ToolButton> */}
            </div>
        </div>
    );
};
