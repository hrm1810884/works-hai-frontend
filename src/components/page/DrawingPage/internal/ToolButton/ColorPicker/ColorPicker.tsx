import { FC } from "react";

import { useBrush } from "@/states/Brush";

import { colorPaletteStyle, iconStyle } from "./ColorPicker.css";

type props = {
    width: string;
    height: string;
};

export const ColorPicker: FC<props> = ({ width, height }) => {
    const {
        brush,
        mutator: { setBrushColor },
    } = useBrush();
    return (
        <div
            className={iconStyle}
            style={{ width: width, height: height, backgroundColor: brush.color }}
        >
            <input
                type="color"
                className={colorPaletteStyle}
                value={brush.color}
                onChange={(e) => setBrushColor(e.target.value as string)}
            ></input>
        </div>
    );
};
