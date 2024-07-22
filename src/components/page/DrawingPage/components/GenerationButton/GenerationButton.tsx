import { ActionIcon } from "@mantine/core";
import { FC } from "react";
import { IoMdSend } from "react-icons/io";

import { vars } from "@/styles";

import { sendButtonStyle } from "./GenerationButton.css";

type props = {
    text: string;
    onClick: () => void;
};
export const GenerationButton: FC<props> = ({ text, onClick: handleClick }) => {
    return (
        <ActionIcon
            type="submit"
            variant="filled"
            color={vars.colors.white}
            radius={vars.radius.lg}
            onClick={handleClick}
            className={sendButtonStyle}
        >
            <span style={{ marginRight: vars.spacing.sm }}>{text}</span>
            <IoMdSend style={{ display: "flex" }}></IoMdSend>
        </ActionIcon>
    );
};
