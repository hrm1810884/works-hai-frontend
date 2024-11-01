import Image from "next/image";
import { FC } from "react";

import { useViewer } from "../../../page/ViewerPage/hooks";

import { container } from "./ViewerCard.css";

type props = {
    x: number;
    y: number;
    src: string;
};

export const ViewerCard: FC<props> = (props) => {
    const { x: posX, y: posY, src: url } = props;
    const { offset } = useViewer();
    return (
        <div
            className={container}
            style={{
                gridColumn: `${posX - offset.x + 1} / span 1`,
                gridRow: `${-posY - offset.y + 1} / span 1`,
            }}
        >
            <Image
                src={url}
                alt={`drawing of pos (${posX}, ${posY})`}
                fill
                style={{ objectFit: "contain" }}
                sizes="100%"
            />
        </div>
    );
};
