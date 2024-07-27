import { FC } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { BiEraser, BiPencil, BiRedo, BiUndo } from "react-icons/bi";
import { BsBorderWidth } from "react-icons/bs";

import { ICON_SIZE } from "@/model/consts";
import { useBrush } from "@/states/Brush";
import { useHistory } from "@/states/History";

import { ColorPicker, LineWidthMenu, ToolButton } from "../ToolButton";

import { toolBarStyle, toolButtonsContainerStyle } from "./ToolBar.css";

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

    return (
        <div className={toolBarStyle}>
            {/* undo, redo, trash */}
            <div className={toolButtonsContainerStyle}>
                {/* Undo history */}
                <ToolButton
                    onClick={undoHistory}
                    icon={BiUndo}
                    isDisabled={isOldestHistory()}
                ></ToolButton>

                {/* Redo history */}
                <ToolButton
                    onClick={redoHistory}
                    icon={BiRedo}
                    isDisabled={isNewestHistory()}
                ></ToolButton>

                {/* Clear canvas */}
                <ToolButton onClick={initializeHistory} icon={AiOutlineClear}></ToolButton>
            </div>

            {/* Tools */}
            <div className={toolButtonsContainerStyle}>
                {/* Pen */}
                <ToolButton
                    onClick={() => {
                        setBrushType("PENCIL");
                    }}
                    icon={BiPencil}
                    isSelected={brush.type === "PENCIL"}
                ></ToolButton>

                {/* Eraser */}
                <ToolButton
                    onClick={() => {
                        setBrushType("ERASER");
                    }}
                    icon={BiEraser}
                    isSelected={brush.type === "ERASER"}
                ></ToolButton>

                {/* Line width */}
                <LineWidthMenu icon={BsBorderWidth}></LineWidthMenu>

                {/* Color */}
                <ColorPicker width={ICON_SIZE} height={ICON_SIZE}></ColorPicker>
            </div>
        </div>
    );
};
