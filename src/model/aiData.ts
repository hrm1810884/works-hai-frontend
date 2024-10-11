export const aiPositionList = ["top", "left", "bottom", "right"] as const;

export type AiPosition = (typeof aiPositionList)[number];

export type AiData<T> = Record<AiPosition, T>;

export type AiSrc = Partial<AiData<string>>;
