import { FC } from "react";

import { useBrush } from "@/states/Brush";
import { lineWidth, lineWidthList } from "@/types";

import {
    lineWidthInputStyle,
    lineWidthInputWrapper,
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
        mutator: { setBrushWidth },
    } = useBrush();

    return (
        <div className={modalStyle}>
            {lineWidthList.map((width) => {
                return (
                    <div
                        id={"width_" + width}
                        onClick={(e) => {
                            e.stopPropagation();
                            setBrushWidth(width);
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
            <hr style={{ marginTop: "2px", marginBottom: "2px" }} />
            <div className={lineWidthInputWrapper}>
                <input
                    onClick={(e) => e.stopPropagation()}
                    type="number"
                    value={brush.width}
                    onChange={(e) => setBrushWidth(parseInt(e.target.value) as lineWidth)}
                    className={lineWidthInputStyle}
                />
                <span>px</span>
            </div>
        </div>
    );
};
