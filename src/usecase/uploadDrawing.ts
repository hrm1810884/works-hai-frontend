import { useCallback } from "react";

import { useCanvas } from "@/states/Canvas";
import { useUserContext } from "@/states/User";
import { guardUndef } from "@/utils";
import { UsecaseMethod, usecaseResultError, usecaseResultOk } from "@/utils/usecase";

export const useUploadUsecase = () => {
    const { getDrawingLink } = useCanvas();
    const { saveUrlRef } = useUserContext();

    const uploadDrawing = useCallback(async () => {
        try {
            const drawingUrl = getDrawingLink();
            const presignedUrl = guardUndef(saveUrlRef.current);
            const humanDrawingBlob = await (await fetch(drawingUrl)).blob();

            const response = await fetch(presignedUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "image/png", // Adjust as needed
                },
                body: humanDrawingBlob,
            });

            if (response.status !== 200) {
                return usecaseResultError(new Error("Failed to upload human drawing"));
            }

            return usecaseResultOk("Human drawing uploaded successfully");
        } catch (error) {
            console.error(error);
            return usecaseResultError(new Error("Failed to upload human drawing"));
        }
    }, [saveUrlRef, getDrawingLink]) satisfies UsecaseMethod;

    return { uploadDrawing };
};
