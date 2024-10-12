import { postGenerate } from "@/generated/api";
import { PostGenerateBody } from "@/generated/model";

import { useCallback } from "react";

import { useUserContext } from "@/states/User";
import { guardUndef } from "@/utils";
import { UsecaseMethod, usecaseResultError, usecaseResultOk } from "@/utils/usecase";

export const useGenerationUsecase = () => {
    const { userIdRef } = useUserContext();
    const generateDrawing = useCallback(async () => {
        try {
            const reqBody: PostGenerateBody = { userId: guardUndef(userIdRef.current) };
            const {
                data: { url },
            } = await postGenerate(reqBody);

            return usecaseResultOk(url);
        } catch (err) {
            return usecaseResultError(new Error("failed to generate drawing"));
        }
    }, [userIdRef]) satisfies UsecaseMethod;

    return { generateDrawing };
};
