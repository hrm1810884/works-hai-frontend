import { useCallback } from "react";

import { showToast } from "@/utils";

import { useGenerationService, useUploadService } from "@/service";

export const useGenerationButton = () => {
    const { uploadDrawing } = useUploadService();
    const { generateDrawing } = useGenerationService();

    const handleSubmit = useCallback(async () => {
        const uploadResult = await uploadDrawing();

        if (uploadResult.status === "err") {
            showToast({ message: "画像のアップロードに失敗しました", type: "error" });
            return;
        }

        const generationResult = await generateDrawing();

        if (generationResult.status === "err") {
            showToast({ message: "データの永続化に失敗しました", type: "error" });
            return;
        }

        showToast({ message: "生成を開始します", type: "success" });
    }, [generateDrawing, uploadDrawing]);

    return {
        handler: {
            handleSubmit,
        },
    };
};
