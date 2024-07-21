import { AiData } from "./aiData";

export type AiSrc = AiData<string | undefined>;

export type UserId = string;
export type UserInfo = {
    userId: UserId;
    urlToSave: string;
};
