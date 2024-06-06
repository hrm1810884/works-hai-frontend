import { getGetPresignedUrlsQueryKey } from "@/generated/api";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { usePresignedUrlsRepository } from "@/repository/presignedUrls";

export const useGetPresignedUrlsService = () => {
    const queryClient = useQueryClient();

    const { convertedData: presignedUrls } = usePresignedUrlsRepository();

    const refetch = useCallback(async () => {
        await queryClient.invalidateQueries({ queryKey: getGetPresignedUrlsQueryKey() });
    }, [queryClient]);

    return {
        data: presignedUrls,
        refetch,
    };
};
