import { postImageGeneration } from "@/generated/api";

import { usecaseResultError, usecaseResultOk } from "@/utils/usecase";

export const startImageGeneration = async () => {
    try {
        await postImageGeneration({
            x: 0,
            y: 0,
        });

        return usecaseResultOk(null);
    } catch (error) {
        return usecaseResultError(new Error("保存先の記録に失敗しました"));
    }
};
