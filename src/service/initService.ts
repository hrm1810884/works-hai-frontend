import { useContext } from "react";

import { useInitRepository } from "@/repository";
import { DrawingContext } from "@/states/DrawingContext";

export const useInitService = () => {
    const { userInfo, aiSrc, refetch } = useInitRepository();
    const { userIdRef, saveUrlRef } = useContext(DrawingContext);

    console.log(userInfo);
    if (userIdRef && saveUrlRef) {
        userIdRef.current = userInfo.userId;
        saveUrlRef.current = userInfo.urlToSave;
    }

    return {
        aiSrc,
        refetch,
    };
};
