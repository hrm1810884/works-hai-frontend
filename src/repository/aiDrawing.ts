import { useGetAiDrawingSuspense } from "@/generated/api";

import { convertAiDrawingsFromData } from "@/model/aiDrawing";

export const useAiDrawingRepository = () => {
    const {
        data: {
            data: { result: AiDrawing },
        },
    } = useGetAiDrawingSuspense();

    const convertedData = convertAiDrawingsFromData(AiDrawing);

    return { convertedData };
};
