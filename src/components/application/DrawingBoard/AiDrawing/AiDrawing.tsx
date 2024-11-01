import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";

import { AiPosition } from "@/model";

import { Now } from "@/utils/switchByEnv";

import { imageContainerStyle } from "./AiDrawing.css";

export type props = {
    src: string | undefined;
    pos: AiPosition;
    className?: string;
};

export const AiDrawing: FC<props> = ({ src: url, pos, className }) => {
    const isDrawn = !Now.isMock && !!url;

    return (
        <div className={clsx(imageContainerStyle, className)}>
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
