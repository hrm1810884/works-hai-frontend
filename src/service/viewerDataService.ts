import { ViewerDrawingData } from "@/model";

import { useViewerRepository } from "@/repository/getViewerData";

export const useViewerData = () => {
    const { data: resData, refetch } = useViewerRepository();

    const dataArr: ViewerDrawingData[] = resData.map((data) => {
        return {
            position: data.position,
            url: data.url,
        };
    });

    return {
        data: dataArr,
        refetch,
    };
};
