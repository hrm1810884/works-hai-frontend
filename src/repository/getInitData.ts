import { getGetInitQueryKey, useGetInitSuspense } from "@/generated/api";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { AiSrc, UserInfo } from "@/model";

export const useInitRepository = () => {
    const queryClient = useQueryClient();

    const {
        data: {
            data: { result: initData },
        },
    } = useGetInitSuspense();

    const refetch = useCallback(async () => {
        queryClient.invalidateQueries({ queryKey: getGetInitQueryKey() });
    }, [queryClient]);

    const userInfo: UserInfo = {
        userId: initData.id,
        urlToSave: initData.urls.humanDrawing,
    };

    const aiSrc: AiSrc = {
        top: initData.urls.topDrawing,
        right: initData.urls.rightDrawing,
        bottom: initData.urls.bottomDrawing,
        left: initData.urls.leftDrawing,
    };

    return { userInfo, aiSrc, refetch };
};
