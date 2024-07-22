import { atom, useAtom } from "jotai";
import { MutableRefObject } from "react";

const defaultRef = { current: null };
const userIdRefAtom = atom<MutableRefObject<string | null>>(defaultRef);
const saveUrlRefAtom = atom<MutableRefObject<string | null>>(defaultRef);
export const useUserContext = () => {
    const userIdRefArr = useAtom(userIdRefAtom);
    const saveUrlRefArr = useAtom(saveUrlRefAtom);

    return {
        userIdRef: userIdRefArr[0],
        saveUrlRef: saveUrlRefArr[0],
    };
};
