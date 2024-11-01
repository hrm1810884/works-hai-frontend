import { useCallback, useState } from "react";
import { match } from "ts-pattern";

import { useCanvas } from "@/states/Canvas";
import { useHistory } from "@/states/History";
import { useGenerationUsecase, useInitUsecase, useUploadUsecase } from "@/usecase";
import { delay, guardUndef, showToast } from "@/utils";
import { Now } from "@/utils/switchByEnv";

type ConfirmStage = "pre" | "post";

export const useConfirm = () => {
    const { uploadDrawing } = useUploadUsecase();
    const { generateDrawing } = useGenerationUsecase();
    const { refetch: refetchInit } = useInitUsecase();

    const { clearCanvas } = useCanvas();
    const {
        mutator: { initializeHistory },
    } = useHistory();
    const [imgSrc, setImgSrc] = useState<string>("no-image.png");
    const [stage, setStage] = useState<ConfirmStage>("pre");

    const handlePreClick = useCallback(async () => {
        const uploadResult = await uploadDrawing();

        if (uploadResult.status === "err" && !Now.isMock) {
            showToast({ message: "画像のアップロードに失敗しました", type: "error" });
            return;
        }

        if (Now.isMock) {
            await delay(4000);
        }

        const generationResult = await generateDrawing();
        match(generationResult)
            .with({ status: "ok" }, () => {
                const link = guardUndef(generationResult.val);
                setImgSrc(link);
                setStage("post");
            })
            .with({ status: "err" }, () => {
                showToast({ message: "データの永続化に失敗しました", type: "error" });
            });
    }, [uploadDrawing, generateDrawing]);

    const handlePostClick = useCallback(async () => {
        clearCanvas();
        initializeHistory();
        setStage("pre");
        await refetchInit();
    }, [clearCanvas, initializeHistory, refetchInit]);

    return {
        imgSrc,
        setImgSrc,
        stage,
        handler: {
            handlePreClick,
            handlePostClick,
        },
    };
};
