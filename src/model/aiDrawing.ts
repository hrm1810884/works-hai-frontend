import { GetAiDrawing200Result as DAiDrawing } from "@/generated/model";

import { guardAllUndef } from "@/utils/guardUndef";

export type AiDrawing = DAiDrawing;

export const convertAiDrawingsFromData = (data: DAiDrawing): AiDrawing => {
    try {
        guardAllUndef(data);

        return {
            ...data,
        };
    } catch (err) {
        throw new Error("All AI image has not drawn yet...");
    }
};
