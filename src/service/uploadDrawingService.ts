import { useCallback } from "react";

import { uploadHumanDrawing } from "@/repository";
import { useCanvas } from "@/states/Canvas";
import { useUserContext } from "@/states/User";
import { guardUndef } from "@/utils";

export const useUploadService = () => {
    const { getDrawingLink } = useCanvas();
    const { saveUrlRef } = useUserContext();

    const uploadDrawing = useCallback(async () => {
        const drawingUrl = getDrawingLink();
        const res = await uploadHumanDrawing(drawingUrl, guardUndef(saveUrlRef.current));
        return res;
    }, [saveUrlRef, getDrawingLink]);

    return { uploadDrawing };
};
