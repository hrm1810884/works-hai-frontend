import Image from "next/image";
import { FC } from "react";
import { match } from "ts-pattern";

import { useGetAiDrawingService } from "@/service/aiDrawings/reader";

import { imageContainerStyle } from "./AiDrawing.css";

export type props = {
    position: "top" | "right" | "bottom" | "left";
};

export const AiDrawing: FC<props> = ({ position }) => {
    const { data: aiDrawingUrls } = useGetAiDrawingService();
    const aiDrawingUrl = match(position)
        .with("top", () => aiDrawingUrls.topDrawing)
        .with("right", () => aiDrawingUrls.rightDrawing)
        .with("bottom", () => aiDrawingUrls.bottomDrawing)
        .with("left", () => aiDrawingUrls.leftDrawing)
        .otherwise(() => "https://placehold.jp/3697c7/ffffff/512x512.png?text=WTF");

    return (
        <div className={imageContainerStyle}>
            <Image src={aiDrawingUrl!} alt={"hoge"} fill />
        </div>
    );
};
