import { ActionIcon, Menu } from "@mantine/core";
import React, { FC } from "react";

import { lineWidthData } from "@/model";

import { useBrush } from "@/states/Brush";

import { vars } from "@/styles";

import { lineWidthBar, menuItemStyle } from "./LineWidthMenu.css";

type props = { icon: React.ReactElement };

export const LineWidthMenu: FC<props> = ({ icon }) => {
    const {
        brush,
        mutator: { setBrushWidth },
    } = useBrush();
    return (
        <Menu shadow="md" width={200} offset={30}>
            <Menu.Target>
                <ActionIcon variant="transparent" color={vars.colors.white}>
                    {icon}
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Line Width</Menu.Label>
                {lineWidthData[brush.type].map((val, index) => (
                    <Menu.Item
                        id={`line-width-${index}`}
                        leftSection={`${val} px`}
                        key={index}
                        onClick={() => {
                            setBrushWidth(val);
                        }}
                        className={menuItemStyle({ selected: val === brush.width })}
                    >
                        <div className={lineWidthBar} style={{ height: val + "px" }}></div>
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};
