import { FC } from "react";

import { Brush, BrushType } from "@/model";

import { colorPaletteStyle, iconStyle } from "./ColorPicker.css";

type props = {
    width: string;
    height: string;
    brush: Brush<BrushType>;
    setBrushColor: (_color: string) => void;
};

export const ColorPicker: FC<props> = ({ width, height, brush, setBrushColor }) => {
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
