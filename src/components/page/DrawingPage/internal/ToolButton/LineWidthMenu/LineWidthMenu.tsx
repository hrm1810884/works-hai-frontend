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
                <Menu.Item>
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
                        alignItems: "center",
                        justifyContent: "space-around",
                        height: "24px"
                        }}>
                        <div>{brushRadius.toFixed(1)} px </div>
                        <div className={lineWidthBar} style={{
                            height: `${brushRadius}px`,
                            display: "flex",
                            width: "48px",
                            backgroundColor: brush.color,
                            borderRadius: "3px"
                        }}
                        ></div>
                    </div>
                    
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
