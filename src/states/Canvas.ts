/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { atom, useAtom } from "jotai";
import { RefObject } from "react";

import { canvasContext } from "@/model";

const canvasContextAtom = atom<canvasContext>(null);
const canvasRefAtom = atom<RefObject<HTMLCanvasElement> | null>(null);
export const useCanvas = () => {
    const [canvasContext, setCanvasContext] = useAtom(canvasContextAtom);
    const [canvasRef, _] = useAtom(canvasRefAtom);
    return {
        canvasRef,
        canvasContext,
        setCanvasContext,
    };
};
