import { FC, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { useBrush } from "@/states/Brush";

import { colorPickerStyle, modalStyle } from "./ModalContents.css";

type props = {
    loc?: { x: number; y: number };
};

export const ColorModalContents: FC<props> = (props) => {
    const { loc } = props;
    const {
        brush,
        mutator: { changeBrushColor },
    } = useBrush();

    const [color, setColor] = useState(brush.color);

    useEffect(() => {
        changeBrushColor(color);
    }, [changeBrushColor, color]);

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
            }}
            className={modalStyle}
            style={{ left: loc?.x, top: loc?.y }}
        >
            <HexColorPicker color={color} onChange={setColor} className={colorPickerStyle} />
        </div>
    );
};
