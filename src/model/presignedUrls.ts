import { GetPresignedUrls200Result as DPresignedUrls } from "@/generated/model";

import { guardUndef } from "@/utils/guardUndef";

export type PresignedUrls = DPresignedUrls;

export const convertPresignedUrlsFromData = (data: DPresignedUrls): PresignedUrls => {
    try {
        const { humanDrawing: presignedUrlForHuman, ...presignedUrlsForAI } = data;
        guardUndef(presignedUrlForHuman);
        console.log(presignedUrlForHuman);
        // guardAllUndef(presignedUrlsForAI);

        return {
            ...data,
        };
    } catch (err) {
        throw new Error("All AI image has not drawn yet...");
    }
};
