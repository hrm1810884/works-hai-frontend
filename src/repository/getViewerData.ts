import { getGetViewQueryKey, useGetViewSuspense } from "@/generated/api";
import { GetViewBody } from "@/generated/model";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { Position } from "@/model";

export const useViewerRepository = (position: Position) => {
    const queryClient = useQueryClient();

    const req: GetViewBody = { position: { x: position.x, y: position.y } };

    const {
        data: {
            data: { result: viewerData },
        },
    } = useGetViewSuspense(req);

    const refetch = useCallback(async () => {
        const refetchReq: GetViewBody = { position: { x: position.x, y: position.y } };
        queryClient.invalidateQueries({ queryKey: getGetViewQueryKey(refetchReq) });
    }, [queryClient, position]);

    const url = viewerData.url;
    const posX = viewerData.position.x;
    const posY = viewerData.position.y;
    const resPosition: Position = { x: posX, y: posY };

    return {
        data: {
            url,
            position: resPosition,
        },
        refetch,
    };
};
