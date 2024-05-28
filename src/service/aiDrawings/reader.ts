import { getGetAiDrawingQueryKey } from "@/generated/api";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { useAiDrawingRepository } from "@/repository/aiDrawing";

export const useGetAiDrawingService = () => {
    const queryClient = useQueryClient();

    const { convertedData: aiDraingData } = useAiDrawingRepository();

    const refetch = useCallback(async () => {
        await queryClient.invalidateQueries({ queryKey: getGetAiDrawingQueryKey() });
    }, [queryClient]);

    return {
        data: aiDraingData,
        refetch,
    };
};
