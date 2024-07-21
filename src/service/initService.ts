import { useEffect } from "react";

import { useInitRepository } from "@/repository";
import { useUserInfo } from "@/states/User";

export const useInitService = () => {
    const { userInfo, aiSrc, refetch } = useInitRepository();
    const { setUserInfo } = useUserInfo();

    useEffect(() => {
        console.log(userInfo);
        setUserInfo(userInfo);
    }, []);

    return {
        aiSrc,
        refetch,
    };
};
