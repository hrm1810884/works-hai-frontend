"use client";

import { VIWER_CARD_SIZE } from "@/model/consts";

import { useViewer } from "./hooks";

import { ViewerCard } from "./components/ViewerCard/ViewerCard";

export const ViewerPage = () => {
    const { data, grid } = useViewer();

    return (
        <div
            style={{
                display: "grid",
                position: "relative",
                gridTemplateColumns: `repeat(${grid.cols}, ${VIWER_CARD_SIZE})`,
                gridTemplateRows: `repeat(${grid.rows}, ${VIWER_CARD_SIZE})`,
            }}
        >
            {data.map((img, index) => (
                <ViewerCard key={index} x={img.position.x} y={img.position.y} src={img.url} />
            ))}
        </div>
    );
};
