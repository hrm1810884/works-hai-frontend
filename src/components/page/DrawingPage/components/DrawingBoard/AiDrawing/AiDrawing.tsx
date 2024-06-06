import Image from "next/image";
import { FC } from "react";
import { match } from "ts-pattern";

import { imageContainerStyle, noImageStyle } from "./AiDrawing.css";

export type props = {
    position: "top" | "right" | "bottom" | "left";
};

export const AiDrawing: FC<props> = ({ position }) => {
    // const { data: aiDrawingUrls } = useGetAiDrawingService();
    const aiDrawingUrl = match(position)
        .with("top", () => undefined)
        .with("right", () => undefined)
        .with("bottom", () => undefined)
        .with("left", () => undefined)
        .otherwise(() => "https://placehold.jp/3697c7/ffffff/512x512.png?text=WTF");

    return (
        <div className={imageContainerStyle}>
            {aiDrawingUrl ? (
                <Image src={aiDrawingUrl!} alt={`AI drawing at ${position}`} fill />
            ) : (
                <div className={noImageStyle}></div>
            )}
        </div>
    );
};
