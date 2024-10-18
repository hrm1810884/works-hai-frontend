import { Menu } from "@mantine/core";
import { FC } from "react";
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
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <IconButton variant="transparent" color={vars.colors.white} icon={icon} />
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
