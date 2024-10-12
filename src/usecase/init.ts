import { useInitRepository } from "@/repository";
import { useUserContext } from "@/states/User";

export const useInitUsecase = () => {
    const { userInfo, aiSrc, refetch } = useInitRepository();
    const { userIdRef, saveUrlRef } = useUserContext();

    if (userIdRef && saveUrlRef) {
        userIdRef.current = userInfo.userId;
        saveUrlRef.current = userInfo.urlToSave;
    }

    return {
        aiSrc,
        refetch,
    };
};
