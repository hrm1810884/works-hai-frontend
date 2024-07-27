import React, { FC } from "react";
import { IconType } from "react-icons/lib";

import { IconButton } from "@/components/common/ui";

import { toolButtonStyle } from "./ToolButton.css";

type props = {
    icon: IconType;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    isSelected?: boolean;
    isDisabled?: boolean;
};

export const ToolButton: FC<props> = (props) => {
    const { icon, onClick, isSelected, isDisabled } = props;

    return (
        <IconButton
            onClick={onClick}
            disabled={isDisabled}
            className={toolButtonStyle({ selected: isSelected })}
            variant="transparent"
            color="white"
            icon={icon}
        />
    );
};
