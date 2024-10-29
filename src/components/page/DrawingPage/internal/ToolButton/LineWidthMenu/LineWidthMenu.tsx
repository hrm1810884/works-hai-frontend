import { Menu } from "@mantine/core";
import { Slider } from "@mantine/core";
import { FC, useState } from "react";
import { IconType } from "react-icons/lib";

import { lineWidthData } from "@/model";

import { useBrush } from "@/states/Brush";

import { IconButton } from "@/components/common/ui";

import { vars } from "@/styles";

import { lineWidthBar, menuItemStyle } from "./LineWidthMenu.css";

type props = { icon: IconType };

export const LineWidthMenu: FC<props> = ({ icon }) => {
    const {
        brush,
        mutator: { setBrushWidth },
    } = useBrush();

    const [brushRadius, setBrushRadius] = useState(8);

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <IconButton variant="transparent" color={vars.colors.white} icon={icon} />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Line Width</Menu.Label>
                <Menu.Item
                // className={menuItemStyle({ selected: val === brush.width[brush.type] })}
                >
                    <Slider
                        color={vars.colors.teal[6]}
                        defaultValue={8}
                        min={1}
                        step={0.1}
                        max={24}
                        value={brushRadius}
                        onChange={setBrushRadius}
                        onChangeEnd={setBrushWidth}
                    />
                    <div style={{
                        display: "flex",
                        alignItems: "center"
                        }}>
                        <div>{brushRadius.toFixed(1)} px </div>
                        <div className={lineWidthBar} style={{ height: `${brushRadius}px` }}></div>
                    </div>
                    
                </Menu.Item>

                {/* {lineWidthData[brush.type].map((val, index) => (
                    <Menu.Item
                        id={`line-width-${index}`}
                        leftSection={`${val} px`}
                        key={index}
                        onClick={() => {
                            setBrushWidth(val);
                        }}
                        className={menuItemStyle({ selected: val === brush.width[brush.type] })}
                    >
                        <div className={lineWidthBar} style={{ height: val + "px" }}></div>
                    </Menu.Item>
                ))} */}
            </Menu.Dropdown>
        </Menu>
    );
};
