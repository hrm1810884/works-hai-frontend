import { useGetPresignedUrlsSuspense } from "@/generated/api";

import { useEffect } from "react";

import { convertPresignedUrlsFromData } from "@/model/presignedUrls";
import { useStorage } from "@/states/Storage";

export const usePresignedUrlsRepository = () => {
    const {
        mutator: { updatePresignedUrl },
    } = useStorage();
    const {
        data: {
            data: { result: presignedUrls },
        },
    } = useGetPresignedUrlsSuspense();

    const convertedData = convertPresignedUrlsFromData(presignedUrls);
    useEffect(() => {
        const { humanDrawing: presignedUrlForHuman } = convertedData;
        updatePresignedUrl(presignedUrlForHuman);
    }, [convertedData, updatePresignedUrl]);

    return { convertedData };
};
