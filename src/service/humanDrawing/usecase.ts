/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { postHumanDrawing } from "@/generated/api";

import { useStorage } from "@/states/Storage";
import { UsecaseMethod, usecaseResultError, usecaseResultOk } from "@/utils/usecase";

export const sendHumanDrawing = (async (humanDrawing) => {
    const { presignedUrl } = useStorage();
    try {
        const {
            data: { message },
        } = await postHumanDrawing({
            image: humanDrawing,
            presigned_url: presignedUrl,
        });

        return usecaseResultOk(null);
    } catch (error) {
        return usecaseResultError(new Error("絵のアップロードに失敗しました"));
    }
}) satisfies UsecaseMethod;
