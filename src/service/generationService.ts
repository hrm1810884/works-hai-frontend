import { useCallback } from "react";

import { requestGenerateDrawing } from "@/repository/generateDrawing";
import { useUserContext } from "@/states/User";
import { guardUndef } from "@/utils";

export const useGenerationService = () => {
    const { userIdRef } = useUserContext();
    const generateDrawing = useCallback(async () => {
        const res = await requestGenerateDrawing(guardUndef(userIdRef.current));
        return res;
    }, [userIdRef]);

    return { generateDrawing };
};
