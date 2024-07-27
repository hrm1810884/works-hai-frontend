import { ActionIcon, ActionIconProps } from "@mantine/core";
import { ComponentType, FC, MouseEventHandler } from "react";
import { IconBaseProps } from "react-icons/lib";

import { ICON_SIZE } from "@/model";

import { iconButtonStyle } from "./IconButton.css";

type props = ActionIconProps & {
    icon: ComponentType<IconBaseProps>;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const IconButton: FC<props> = ({
    icon: Icon,
    onClick: handleClick,
    className,
    ...props
}) => {
    return (
        <ActionIcon {...props} onClick={handleClick} className={`${iconButtonStyle} ${className}`}>
            <Icon size={ICON_SIZE} />
        </ActionIcon>
    );
};
