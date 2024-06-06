import { ActionIcon } from "@mantine/core";
import { useCallback } from "react";
import { IoMdSend } from "react-icons/io";
import { match } from "ts-pattern";

import { sendHumanDrawing } from "@/service/humanDrawing";
import { useGetPresignedUrlsService } from "@/service/humanDrawing/reader";
import { showToast } from "@/utils";

import { useCanvas } from "../DrawingBoard/Canvas/hooks";

import { vars } from "@/styles";

import { sendButtonStyle } from "./SendButton.css";

export const SendButton = () => {
    const { canvasRef } = useCanvas();
    const { data, refetch } = useGetPresignedUrlsService();

    const onSubmit = useCallback(async () => {
        const currentCanvas = canvasRef?.current;
        const humanDrawing = currentCanvas?.toDataURL("image/png");
        const blob = await (await fetch(humanDrawing!)).blob();
        const result = await sendHumanDrawing(humanDrawing!, data.humanDrawing);

        match(result)
            .with({ status: "ok" }, () => {
                refetch();
                showToast({ message: "画像をアップロードしました", type: "success" });
            })
            .with({ status: "err" }, () => {
                showToast({ message: "画像のアップロードに失敗しました", type: "error" });
            })
            .exhaustive();
    }, [canvasRef, refetch, data]);

    return (
        <ActionIcon
            type="submit"
            variant="filled"
            color={vars.colors.white}
            radius={vars.radius.lg}
            onClick={onSubmit}
            className={sendButtonStyle}
        >
            <span style={{ marginRight: vars.spacing.sm }}>{"Send"}</span>
            <IoMdSend style={{ display: "flex" }}></IoMdSend>
        </ActionIcon>
    );
};
