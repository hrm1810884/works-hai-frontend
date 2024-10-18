import { ActionIcon, ActionIconProps } from "@mantine/core";
import clsx from "clsx";
import React, { ComponentType, MouseEventHandler } from "react";
import { IconBaseProps } from "react-icons/lib";

import { ICON_SIZE } from "@/model";

import { iconButtonStyle } from "./IconButton.css";

type Props = ActionIconProps & {
    icon: ComponentType<IconBaseProps>;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

/**
 * NOTE: Menuなどを利用する際の位置決定ロジックで裏でrefが渡されるので、forwardRefを使う
 */
export const IconButton = React.forwardRef<HTMLButtonElement, Props>(
    ({ icon: Icon, onClick: handleClick, className, ...props }, ref) => {
        return (
            <ActionIcon
                ref={ref}
                onClick={handleClick}
                className={clsx(iconButtonStyle, className)}
                {...props}
            >
                <Icon size={ICON_SIZE} />
            </ActionIcon>
        );
    }
);

IconButton.displayName = "IconButton";
