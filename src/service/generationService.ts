import { useCallback } from "react";

import { requestGenerateDrawing } from "@/repository/generateDrawing";
import { useUserInfo } from "@/states/User";

export const useGenerationService = () => {
    const { userInfo } = useUserInfo();
    const generateDrawing = useCallback(async () => {
        const res = await requestGenerateDrawing(userInfo.userId);
        return res;
    }, [userInfo]);

    return { generateDrawing };
};
