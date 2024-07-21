import { atom, useAtom } from "jotai";

import { UserInfo } from "@/model";

const defaultUserInfo: UserInfo = { userId: "", urlToSave: "" };
const userInfoAtom = atom<UserInfo>(defaultUserInfo);
export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);

    return {
        userInfo,
        setUserInfo,
    };
};
