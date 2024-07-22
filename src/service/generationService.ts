import { useCallback, useContext } from "react";

import { requestGenerateDrawing } from "@/repository/generateDrawing";
import { DrawingContext } from "@/states/DrawingContext";
import { guardUndef } from "@/utils";

export const useGenerationService = () => {
    const { userIdRef } = useContext(DrawingContext);
    const generateDrawing = useCallback(async () => {
        const res = await requestGenerateDrawing(guardUndef(userIdRef.current));
        return res;
    }, [userIdRef]);

    return { generateDrawing };
};
