import { ActionIcon } from "@mantine/core";
import React, { FC } from "react";
import { IconType } from "react-icons/lib";

import { vars } from "@/styles";

import { buttonStyle } from "./ButtonWithIcon.css";

type Props = React.ComponentProps<typeof ActionIcon<"button">> & {
    text: string;
    icon: IconType;
};

export const ButtonWithIcon: FC<Props> = (props) => {
    const { text, icon: Icon, onClick: handleClick, ...otherProps } = props;
    return (
        <ActionIcon
            {...otherProps}
            variant="filled"
            color={vars.colors.white}
            radius={vars.radius.lg}
            onClick={handleClick}
            className={buttonStyle}
        >
            <span style={{ marginRight: vars.spacing.sm }}>{text}</span>
            <Icon />
        </ActionIcon>
    );
};
