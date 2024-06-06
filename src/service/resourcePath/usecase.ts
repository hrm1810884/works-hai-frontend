import { postResourcePath } from "@/generated/api";

import { usecaseResultError, usecaseResultOk } from "@/utils/usecase";

export const registerResourcePath = async ({ presignedUrl }: { presignedUrl: string }) => {
    try {
        await postResourcePath({
            presigned_url: presignedUrl,
            x: 0,
            y: 0,
        });

        return usecaseResultOk(null);
    } catch (error) {
        return usecaseResultError(new Error("保存先の記録に失敗しました"));
    }
};
