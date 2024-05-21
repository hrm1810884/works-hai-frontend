import { FC, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { useBrush } from "@/states/Brush";

import { colorPickerStyle, modalStyle } from "./ModalContents.css";

type props = {};

export const ColorModalContent: FC<props> = () => {
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
        >
            <HexColorPicker color={color} onChange={setColor} className={colorPickerStyle} />
        </div>
    );
};
