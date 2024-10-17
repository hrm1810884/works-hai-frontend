import { guardUndef } from "./guardUndef";

export const Now = {
    isLocal: guardUndef(process.env.NEXT_PUBLIC_ENV) === "local",
    isMock: guardUndef(process.env.NEXT_PUBLIC_ENABLE_API_MOCK) === "true",
};
