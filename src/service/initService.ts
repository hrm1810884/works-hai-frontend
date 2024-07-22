import { useInitRepository } from "@/repository";
import { useUserContext } from "@/states/User";

export const useInitService = () => {
    const { userInfo, aiSrc, refetch } = useInitRepository();
    const { userIdRef, saveUrlRef } = useUserContext();

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
