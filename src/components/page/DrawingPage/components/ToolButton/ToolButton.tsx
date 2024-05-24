import { ActionIcon } from "@mantine/core";
import React, { FC } from "react";

import { toolButtonStyle } from "./ToolButton.css";

type props = {
    icon: React.ReactElement;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    isSelected?: boolean;
    isDisabled?: boolean;
};

export const ToolButton: FC<props> = (props) => {
    const { icon, onClick, isSelected, isDisabled } = props;

    return (
        <div style={{ position: "relative" }}>
            <ActionIcon
                onClick={onClick}
                disabled={isDisabled}
                className={toolButtonStyle({ selected: isSelected })}
            >
                {icon}
            </ActionIcon>
        </div>
    );
};
