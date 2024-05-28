import { Button } from "@mantine/core";
import { useCallback } from "react";
import { match } from "ts-pattern";

import { sendHumanDrawing } from "@/service/humanDrawing";
import { showToast } from "@/utils";

import { useCanvas } from "../DrawingBoard/Canvas/hooks";

export const SendButton = () => {
    const { canvasRef } = useCanvas();

    const onSubmit = useCallback(async () => {
        const currentCanvas = canvasRef?.current;
        const humanDrawing = currentCanvas?.toDataURL("image/png");
        const blob = await (await fetch(humanDrawing!)).blob();
        const result = await sendHumanDrawing(blob);

        match(result)
            .with({ status: "ok" }, () => {
                showToast({ message: "画像のアップロードしました", type: "success" });
            })
            .with({ status: "err" }, () => {
                showToast({ message: "画像のアップロードに失敗しました", type: "error" });
            })
            .exhaustive();
    }, [canvasRef]);

    return <Button type="submit" variant="outline" onClick={onSubmit}></Button>;
};
