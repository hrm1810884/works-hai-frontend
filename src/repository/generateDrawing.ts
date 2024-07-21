import { postGenerate } from "@/generated/api";
import { PostGenerateBody } from "@/generated/model";

import { UserId } from "@/model";

import { UsecaseMethod, usecaseResultError, usecaseResultOk } from "@/utils/usecase";

export const requestGenerateDrawing = (async (id: UserId) => {
    try {
        const reqBody: PostGenerateBody = { userId: id };
        const {
            data: { url },
        } = await postGenerate(reqBody);

        return usecaseResultOk(url);
    } catch (err) {
        return usecaseResultError(new Error("failed to generate drawing"));
    }
}) satisfies UsecaseMethod;
