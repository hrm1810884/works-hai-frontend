import { useCallback } from "react";

import { uploadHumanDrawing } from "@/repository";
import { useCanvas } from "@/states/Canvas";
import { useUserContext } from "@/states/User";
import { guardUndef } from "@/utils";

export const useUploadService = () => {
    const { canvasRef } = useCanvas();
    const { saveUrlRef } = useUserContext();
    const uploadDrawing = useCallback(async () => {
        const res = await uploadHumanDrawing(canvasRef, guardUndef(saveUrlRef.current));
        return res;
    }, [saveUrlRef, canvasRef]);

    return { uploadDrawing };
};
