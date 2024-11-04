import { Menu, Slider } from "@mantine/core";
import { FC, useCallback, useState } from "react";
import { IconType } from "react-icons/lib";

import { BrushWidth } from "@/model";

import { DEFAULT_LINE_WIDTH, useBrush } from "@/states/Brush";

import { IconButton } from "@/components/common/ui";

import { vars } from "@/styles";

import { lineWidthBarStyle, menuItemStyle, subContainerStyle } from "./LineWidthMenu.css";

type props = { icon: IconType };

export const LineWidthMenu: FC<props> = ({ icon }) => {
    const {
        brush,
        mutator: { setBrushWidth },
    } = useBrush();

    const [sliderValue, setSliderValue] = useState<BrushWidth>({
        PENCIL: DEFAULT_LINE_WIDTH,
        ERASER: DEFAULT_LINE_WIDTH,
    });

    const handleSliderChange = useCallback(
        (value: number) => {
            setSliderValue((prev) => ({
                ...prev,
                [brush.type]: value,
            }));
        },
        [setSliderValue, brush.type]
    );

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <div className={menuItemStyle}>
                    <p>{sliderValue[brush.type]}</p>
                    <IconButton variant="transparent" color={vars.colors.white} icon={icon} />
                </div>
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
                        value={sliderValue[brush.type]}
                        onChange={handleSliderChange}
                        onChangeEnd={setBrushWidth}
                    />
                    <div className={subContainerStyle}>
                        <p>{`${sliderValue[brush.type].toFixed(1)} px `}</p>
                        <div
                            className={lineWidthBarStyle}
                            style={{
                                height: `${sliderValue[brush.type]}px`,
                                backgroundColor: brush.color,
                            }}
                        ></div>
                    </div>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
