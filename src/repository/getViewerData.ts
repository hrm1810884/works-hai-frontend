import { getGetViewQueryKey, useGetViewSuspense } from "@/generated/api";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useViewerRepository = () => {
    const queryClient = useQueryClient();

    const {
        data: {
            data: { result: viewerData },
        },
    } = useGetViewSuspense();

    const refetch = useCallback(async () => {
        queryClient.invalidateQueries({ queryKey: getGetViewQueryKey() });
    }, [queryClient]);

    return {
        data: viewerData,
        refetch,
    };
};
