import { ActionIcon, ColorPicker as MantineColorPicker, Popover } from "@mantine/core";
import React, { FC } from "react";

import { useBrush } from "@/states/Brush";

import { colorPaletteStyle, popoverDropdownStyle } from "./ColorPicker.css";

type props = {
    icon: React.ReactElement;
};

export const ColorPicker: FC<props> = ({ icon }) => {
    const {
        brush,
        mutator: { setBrushColor },
    } = useBrush();
    return (
        <Popover offset={30}>
            <Popover.Target>
                <ActionIcon>{icon}</ActionIcon>
            </Popover.Target>
            <Popover.Dropdown className={popoverDropdownStyle}>
                <MantineColorPicker
                    format="hex"
                    value={brush.color}
                    onChange={setBrushColor}
                    className={colorPaletteStyle}
                ></MantineColorPicker>
            </Popover.Dropdown>
        </Popover>
    );
};
