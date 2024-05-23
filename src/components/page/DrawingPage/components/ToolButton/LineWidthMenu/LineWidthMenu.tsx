import { ActionIcon, Menu } from "@mantine/core";
import { FC } from "react";
import { BsBorderWidth } from "react-icons/bs";

import { useBrush } from "@/states/Brush";
import { lineWidthList } from "@/types";

import { vars } from "@/styles";

import { selectedStyle, widthBar } from "./LineWidthMenu.css";

type props = {};

export const LineWidthMenu: FC<props> = () => {
    const {
        brush,
        mutator: { setBrushWidth },
    } = useBrush();
    return (
        <Menu shadow="md" width={200} offset={-20}>
            <Menu.Target>
                <ActionIcon variant="transparent" color={vars.colors.white}>
                    <BsBorderWidth />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Line Width</Menu.Label>
                {lineWidthList.map((val, index) => (
                    <Menu.Item
                        id={`line-width-${index}`}
                        leftSection={`${val} px`}
                        key={index}
                        onClick={() => {
                            setBrushWidth(val);
                        }}
                        className={brush.width === val ? selectedStyle : undefined}
                    >
                        <div className={widthBar} style={{ height: val + "px" }}></div>
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};
