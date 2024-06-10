import { useCallback } from "react";

import { uploadHumanDrawing, useGetPresignedUrlsService } from "@/service/humanDrawing";
import { startImageGeneration } from "@/service/imageGeneration/usecase";
import { showToast } from "@/utils";

import { useCanvas } from "../DrawingBoard/Canvas/hooks";

export const useGenerationButton = () => {
    const { canvasRef } = useCanvas();
    const { data: presignedUrls, refetch: refetchPresignedUrls } = useGetPresignedUrlsService();

    const handleSubmit = useCallback(async () => {
        const uploadResult = await uploadHumanDrawing(canvasRef, presignedUrls.humanDrawing);

        if (uploadResult.status === "err") {
            showToast({ message: "画像のアップロードに失敗しました", type: "error" });
            return;
        }

        const generationResult = await startImageGeneration();

        if (generationResult.status === "err") {
            showToast({ message: "データの永続化に失敗しました", type: "error" });
            return;
        }

        showToast({ message: "生成を開始します", type: "success" });
        await refetchPresignedUrls();
    }, [refetchPresignedUrls, canvasRef, presignedUrls]);

    return {
        handler: {
            handleSubmit,
        },
    };
};
