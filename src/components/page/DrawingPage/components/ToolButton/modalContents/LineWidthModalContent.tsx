import { FC } from "react";

import { useBrush } from "@/states/Brush";
import { lineWidth, lineWidthList } from "@/types";

import {
    modalStyle,
    selectedWidthBackground,
    selectedWidthHighlight,
    widthBarStyle,
    widthSlectButtonStyle,
} from "./ModalContents.css";

type props = {};

export const LineWidthModalContent: FC<props> = () => {
    const {
        brush,
        mutator: { changeBrushWidth },
    } = useBrush();

    return (
        <div className={modalStyle}>
            {lineWidthList.map((width) => {
                return (
                    <div
                        id={"width_" + width}
                        onClick={(e) => {
                            e.stopPropagation();
                            changeBrushWidth(width);
                        }}
                        key={width}
                        className={`${brush.width === width ? selectedWidthBackground : undefined} ${widthSlectButtonStyle}`}
                    >
                        <span>{width}px</span>
                        <div className={widthBarStyle} style={{ height: width + "px" }}></div>

                        {brush.width === width && (
                            <>
                                <div className={selectedWidthHighlight}></div>
                            </>
                        )}
                    </div>
                );
            })}
            <hr className="my-2" />
            <div className="w-full px-1 rounded-lg text-xs flex items-center gap-2 relative">
                <input
                    onClick={(e) => e.stopPropagation()}
                    type="number"
                    value={brush.width}
                    onChange={(e) => changeBrushWidth(parseInt(e.target.value) as lineWidth)}
                    className="px-2 w-20 h-6 bg-white border border-neutral-300 rounded-lg"
                />
                <span>px</span>
            </div>
        </div>
    );
};
