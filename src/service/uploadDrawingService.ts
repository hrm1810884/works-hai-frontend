import { useCallback, useContext } from "react";

import { uploadHumanDrawing } from "@/repository";
import { DrawingContext } from "@/states/DrawingContext";
import { guardUndef } from "@/utils";

export const useUploadService = () => {
    const { canvasRef } = useContext(DrawingContext);
    const { saveUrlRef } = useContext(DrawingContext);
    const uploadDrawing = useCallback(async () => {
        const res = await uploadHumanDrawing(canvasRef, guardUndef(saveUrlRef.current));
        return res;
    }, [saveUrlRef, canvasRef]);

    return { uploadDrawing };
};
