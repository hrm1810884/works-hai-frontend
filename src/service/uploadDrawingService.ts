import { useCallback, useContext } from "react";

import { uploadHumanDrawing } from "@/repository";
import { DrawingContext } from "@/states/DrawingContext";
import { useUserInfo } from "@/states/User";

export const useUploadService = () => {
    const { canvasRef } = useContext(DrawingContext);
    const { userInfo } = useUserInfo();
    const uploadDrawing = useCallback(async () => {
        const res = await uploadHumanDrawing(canvasRef, userInfo.urlToSave);
        return res;
    }, [userInfo, canvasRef]);

    return { uploadDrawing };
};
