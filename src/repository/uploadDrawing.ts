import { UsecaseMethod, usecaseResultError, usecaseResultOk } from "@/utils/usecase";

export const uploadHumanDrawing = (async (drawingUrl: string, presignedUrl: string) => {
    try {
        const humanDrawingBlob = await (await fetch(drawingUrl)).blob();

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
