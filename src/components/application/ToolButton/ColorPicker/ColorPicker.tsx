import { FC } from "react";

import { Brush } from "@/model";

import { colorPaletteStyle, iconStyle, wrapperStyle } from "./ColorPicker.css";

type props = {
    brush: Brush;
    setBrushColor: (_color: string) => void;
};

export const ColorPicker: FC<props> = ({ brush, setBrushColor }) => {
    return (
        <div className={wrapperStyle}>
            <div className={iconStyle} style={{ backgroundColor: brush.color }}>
                <input
                    type="color"
                    className={colorPaletteStyle}
                    value={brush.color}
                    onChange={(e) => setBrushColor(e.target.value as string)}
                />
            </div>
        </div>
    );
};
