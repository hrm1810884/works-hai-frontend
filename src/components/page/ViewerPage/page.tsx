"use client";

import { useViewer } from "./hooks";

import { ViewerCard } from "./components/ViewerCard/ViewerCard";

import { ViewerGrid } from "./components";

import { wrapper } from "./page.css";

export const ViewerPage = () => {
    const { data } = useViewer();

    return (
        <div className={wrapper}>
            <ViewerGrid>
                {data.map((img, index) => (
                    <ViewerCard key={index} x={img.position.x} y={img.position.y} src={img.url} />
                ))}
            </ViewerGrid>
        </div>
    );
};
