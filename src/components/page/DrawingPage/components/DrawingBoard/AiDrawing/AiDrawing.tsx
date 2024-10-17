import Image from "next/image";
import { FC } from "react";

import { AiPosition } from "@/model";

import { guardUndef } from "@/utils";

import { imageContainerStyle } from "./AiDrawing.css";

export type props = {
    src: string | undefined;
    pos: AiPosition;
};

export const AiDrawing: FC<props> = ({ src: url, pos }) => {
    const isMock = guardUndef(process.env.NEXT_PUBLIC_ENABLE_API_MOCK) === "true";
    const isDrawn = !isMock && !!url;

    return (
        <div className={imageContainerStyle}>
            <Image
                src={isDrawn ? url : "/no-image.png"}
                alt={`AI drawing at ${pos}`}
                fill
                sizes="100%"
                draggable={false}
            />
        </div>
    );
};
