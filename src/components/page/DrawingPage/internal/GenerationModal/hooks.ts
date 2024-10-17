import { useCallback, useState } from "react";
import { match } from "ts-pattern";

import { useHistory } from "@/states/History";
import { useGenerationUsecase, useInitUsecase, useUploadUsecase } from "@/usecase";
import { guardUndef, showToast } from "@/utils";

type ConfirmStage = "pre" | "post";

export const useConfirm = () => {
    const { uploadDrawing } = useUploadUsecase();
    const { generateDrawing } = useGenerationUsecase();
    const { refetch } = useInitUsecase();

    const {
        mutator: { initializeHistory },
    } = useHistory();
    const [imgSrc, setImgSrc] = useState<string>("no-image.png");
    const [stage, setStage] = useState<ConfirmStage>("pre");

    const handlePreClick = useCallback(async () => {
        const uploadResult = await uploadDrawing();

        if (uploadResult.status === "err") {
            showToast({ message: "画像のアップロードに失敗しました", type: "error" });
            return;
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
        initializeHistory();
        setStage("pre");
        await refetch();
    }, [initializeHistory, refetch]);

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
