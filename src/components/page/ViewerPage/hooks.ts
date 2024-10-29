import { useCallback, useEffect, useMemo, useState } from "react";

import { ViewerDrawingData } from "@/model";

import { useViewerData } from "@/usecase/getViwerData";
import { AbsoluteVector, getAbsoluteVectorToShiftForCentering } from "@/utils/viewer";

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

export const useViewerTransform = () => {
    const { data } = useViewerData();

    const [absoluteVectorToShiftForCentering, setAbsoluteVectorToShiftForCentering] =
        useState<AbsoluteVector>({ height: 0, width: 0 });
    useEffect(() => {
        // Handler to call on window resize
        const handleResize = () => {
            try {
                const absoluteVector: AbsoluteVector | null = getAbsoluteVectorToShiftForCentering(
                    data.length,
                    window.innerHeight
                );
                console.log(absoluteVector);

                if (absoluteVector !== null) {
                    setAbsoluteVectorToShiftForCentering({
                        height: absoluteVector.height,
                        width: absoluteVector.width,
                    });
                    console.log(absoluteVector);
                }
            } catch (error) {
                console.error("failed to calculate vector", error);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [data.length]);

    return absoluteVectorToShiftForCentering;
};
