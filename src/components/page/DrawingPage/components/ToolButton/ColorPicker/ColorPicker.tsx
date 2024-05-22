import { Button, ColorPicker as MantineColorPicker, Popover } from "@mantine/core";
import { FC } from "react";

import { useBrush } from "@/states/Brush";

import { styleUtils } from "@/styles";

type props = {};

export const ColorPicker: FC<props> = () => {
    const {
        brush,
        mutator: { setBrushColor },
    } = useBrush();
    return (
        <Popover>
            <Popover.Target>
                <Button
                    className={styleUtils.iconStyle}
                    style={{ backgroundColor: brush.color }}
                ></Button>
            </Popover.Target>
            <Popover.Dropdown style={{ padding: "0", backgroundColor: "transparent" }}>
                <MantineColorPicker
                    format="hex"
                    value={brush.color}
                    onChange={setBrushColor}
                    style={{ backgroundColor: "transparent" }}
                ></MantineColorPicker>
            </Popover.Dropdown>
        </Popover>
    );
};
