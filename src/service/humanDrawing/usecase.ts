/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */

import React from "react";

import { guardUndef } from "@/utils";
import { UsecaseMethod, usecaseResultError, usecaseResultOk } from "@/utils/usecase";

export const uploadHumanDrawing = (async (
    canvasRef: React.RefObject<HTMLCanvasElement> | null,
    presignedUrl: string
) => {
    try {
        const currentCanvas = guardUndef(canvasRef).current;
        const humanDrawing = guardUndef(currentCanvas).toDataURL("image/png");
        const humanDrawingBlob = await (await fetch(humanDrawing!)).blob();

        const response = await fetch(presignedUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "image/png", // 必要に応じて変更
            },
            body: humanDrawingBlob,
        });

        if (response.status !== 200) {
            return usecaseResultError(new Error("human drawingをアップロードできませんでした"));
        }

        return usecaseResultOk("human drawing アップロード成功");
    } catch (error) {
        console.error(error);
        return usecaseResultError(new Error("human drawingをアップロードできませんでした"));
    }
}) satisfies UsecaseMethod;
