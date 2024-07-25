import { Position } from "@/model";

import { useViewerRepository } from "@/repository/getViewerData";

export const useViewerData = (position: Position) => {
    const {
        data: { url, position: resPosition },
        refetch: refetchByPos,
    } = useViewerRepository(position);

    return {
        data: { url, position: resPosition },
        refetchByPos,
    };
};
