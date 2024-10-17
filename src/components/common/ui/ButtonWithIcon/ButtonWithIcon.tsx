import { ActionIcon } from "@mantine/core";
import { FC } from "react";
import { IconType } from "react-icons/lib";

import { vars } from "@/styles";

import { buttonStyle } from "./ButtonWithIcon.css";

type Props = {
    text: string;
    icon: IconType;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
};

export const ButtonWithIcon: FC<Props> = (props) => {
    const { text, icon: Icon, onClick: handleClick, type } = props;
    return (
        <ActionIcon
            type={type}
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
