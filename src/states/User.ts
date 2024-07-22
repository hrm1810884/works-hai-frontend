import { atom, useAtom } from "jotai";
import { createRef, MutableRefObject } from "react";

const userIdRefAtom = atom<MutableRefObject<string | null>>(createRef<string>());
const saveUrlRefAtom = atom<MutableRefObject<string | null>>(createRef<string>());
export const useUserContext = () => {
    const userIdRefArr = useAtom(userIdRefAtom);
    const saveUrlRefArr = useAtom(saveUrlRefAtom);

    return {
        userIdRef: userIdRefArr[0],
        saveUrlRef: saveUrlRefArr[0],
    };
};
