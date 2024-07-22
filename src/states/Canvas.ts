/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { atom, useAtom } from "jotai";
import { createRef, MutableRefObject, useCallback } from "react";

import { canvasContext } from "@/model";

import { guardUndef } from "@/utils";

const canvasContextAtom = atom<canvasContext>(null);
const canvasRefAtom =
    atom<MutableRefObject<HTMLCanvasElement | null>>(createRef<HTMLCanvasElement>());
export const useCanvas = () => {
    const [canvasContext, setCanvasContext] = useAtom(canvasContextAtom);
    const [canvasRef, _] = useAtom(canvasRefAtom);

    const getDrawingLink = useCallback(() => {
        const currentCanvas = guardUndef(canvasRef).current;
        const link = guardUndef(currentCanvas).toDataURL("image/png");
        return link;
    }, [canvasRef]);

    return {
        canvasRef,
        canvasContext,
        setCanvasContext,
        getDrawingLink,
    };
};
