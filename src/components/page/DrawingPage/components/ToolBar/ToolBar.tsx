import { FC } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { BiPencil, BiEraser, BiRedo, BiUndo } from "react-icons/bi";
import { BsBorderWidth } from "react-icons/bs";

import { useBrush } from "@/states/Brush";
import { useHistory } from "@/states/History";

import { ToolButton, ColorPicker, LineWidthMenu } from "../ToolButton";

import { colorPaletteIcon, toolBarStyle, toolButtonsContainerStyle } from "./ToolBar.css";

type props = {};

export const ToolBar: FC<props> = () => {
    const {
        mutator: { undoHistory, redoHistory, initializeHistory },
        flag: { isNewestHistory, isOldestHistory },
    } = useHistory();

    const {
        brush,
        mutator: { setBrushType },
    } = useBrush();

    const ICON_SIZE = "2rem";

    return (
        <div className={toolBarStyle}>
            {/* undo, redo, trash */}
            <div className={toolButtonsContainerStyle}>
                {/* Undo history */}
                <ToolButton
                    onClick={undoHistory}
                    icon={<BiUndo size={ICON_SIZE}></BiUndo>}
                    isDisabled={isOldestHistory}
                ></ToolButton>

                {/* Redo history */}
                <ToolButton
                    onClick={redoHistory}
                    icon={<BiRedo size={ICON_SIZE}></BiRedo>}
                    isDisabled={isNewestHistory}
                ></ToolButton>

                {/* Clear canvas */}
                <ToolButton
                    onClick={initializeHistory}
                    icon={<AiOutlineClear size={ICON_SIZE}></AiOutlineClear>}
                ></ToolButton>
            </div>

            {/* Tools */}
            <div className={toolButtonsContainerStyle}>
                {/* Pen */}
                <ToolButton
                    onClick={() => {
                        setBrushType("PENCIL");
                    }}
                    icon={<BiPencil size={ICON_SIZE}></BiPencil>}
                    isSelected={brush.type === "PENCIL"}
                ></ToolButton>

                {/* Eraser */}
                <ToolButton
                    onClick={() => {
                        setBrushType("ERASER");
                    }}
                    icon={<BiEraser size={ICON_SIZE}></BiEraser>}
                    isSelected={brush.type === "ERASER"}
                ></ToolButton>

                {/* Line width */}
                <LineWidthMenu icon={<BsBorderWidth size={ICON_SIZE} />}></LineWidthMenu>

                {/* Color */}
                <ColorPicker
                    icon={
                        <div
                            className={colorPaletteIcon}
                            style={{
                                backgroundColor: brush.color,
                                width: ICON_SIZE,
                                height: ICON_SIZE,
                            }}
                        ></div>
                    }
                ></ColorPicker>
            </div>
        </div>
    );
};
