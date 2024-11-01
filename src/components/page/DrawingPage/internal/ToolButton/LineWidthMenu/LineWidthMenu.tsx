import { Menu, Slider } from "@mantine/core";
import { FC, useState } from "react";
import { IconType } from "react-icons/lib";

import { useBrush } from "@/states/Brush";

import { IconButton } from "@/components/common/ui";

import { vars } from "@/styles";

import { lineWidthBarStyle, subContainerStyle } from "./LineWidthMenu.css";

type props = { icon: IconType };

const DEFAULT_LINE_WIDTH = 8;

export const LineWidthMenu: FC<props> = ({ icon }) => {
    const {
        brush,
        mutator: { setBrushWidth },
    } = useBrush();

    const [sliderValue, setSliderValue] = useState(DEFAULT_LINE_WIDTH);

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <IconButton variant="transparent" color={vars.colors.white} icon={icon} />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Line Width</Menu.Label>
                <Menu.Item>
                    <Slider
                        color={vars.colors.teal[6]}
                        defaultValue={DEFAULT_LINE_WIDTH}
                        min={1}
                        step={0.1}
                        max={24}
                        value={sliderValue}
                        onChange={setSliderValue}
                        onChangeEnd={setBrushWidth}
                    />
                    <div className={subContainerStyle}>
                        <p>{`${sliderValue.toFixed(1)} px `}</p>
                        <div
                            className={lineWidthBarStyle}
                            style={{
                                height: `${sliderValue}px`,
                                backgroundColor: brush.color,
                            }}
                        ></div>
                    </div>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
