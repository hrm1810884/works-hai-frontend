/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */

import { UsecaseMethod, usecaseResultError, usecaseResultOk } from "@/utils/usecase";

export const sendHumanDrawing = (async (humanDrawing: string, presignedUrl: string) => {
    try {
        const response = await fetch(presignedUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "image/png", // 必要に応じて変更
            },
            body: humanDrawing,
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
