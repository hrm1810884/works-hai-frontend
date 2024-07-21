import { ActionIcon } from "@mantine/core";
import { IoMdSend } from "react-icons/io";

import { useGenerationButton } from "./hooks";

import { vars } from "@/styles";

import { sendButtonStyle } from "./GenerationButton.css";

export const GenerationButton = () => {
    const {
        handler: { handleSubmit },
    } = useGenerationButton();

    return (
        <ActionIcon
            type="submit"
            variant="filled"
            color={vars.colors.white}
            radius={vars.radius.lg}
            onClick={handleSubmit}
            className={sendButtonStyle}
        >
            <span style={{ marginRight: vars.spacing.sm }}>{"AI生成"}</span>
            <IoMdSend style={{ display: "flex" }}></IoMdSend>
        </ActionIcon>
    );
};
