import { useCallback, useMemo } from "react";

import { ViewerDrawingData } from "@/model";

import { useViewerData } from "@/usecase/getViwerData";

export const useViewer = () => {
    const { data, refetch } = useViewerData();

    const getGridSize = useCallback((data: ViewerDrawingData[]) => {
        const xValues = data.map((item) => item.position.x);
        const yValues = data.map((item) => item.position.y);

        const maxX = Math.max(...xValues);
        const minX = Math.min(...xValues);
        const maxY = Math.max(...yValues);
        const minY = Math.min(...yValues);

        return {
            cols: maxX - minX + 1,
            rows: maxY - minY + 1,
            offsetX: minX,
            offsetY: -maxY,
        };
    }, []);

    const { rows, cols, offsetX, offsetY } = useMemo(() => getGridSize(data), [data, getGridSize]);

    return {
        data,
        refetch,
        grid: { rows, cols },
        offset: { x: offsetX, y: offsetY },
    };
};
