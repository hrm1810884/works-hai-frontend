"use client";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";

import { useViewer } from "./hooks";

import { ViewerCard, ViewerGrid } from "./components";

import { controlWrapper, wrapper } from "./page.css";

export const ViewerPage = () => {
    const { data } = useViewer();

    const Control = () => {
        const { zoomIn, zoomOut, resetTransform } = useControls();
        return (
            <div className={controlWrapper}>
                <button onClick={() => zoomIn()}>Zoom In</button>
                <button onClick={() => zoomOut()}>Zoom Out</button>
                <button onClick={() => resetTransform()}>Reset</button>
            </div>
        );
    };

    return (
        <div className={wrapper}>
            <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0}>
                <>
                    <Control />
                    <TransformComponent>
                        <ViewerGrid>
                            {data.map((img, index) => (
                                <ViewerCard
                                    key={index}
                                    x={img.position.x}
                                    y={img.position.y}
                                    src={img.url}
                                />
                            ))}
                        </ViewerGrid>
                    </TransformComponent>
                </>
            </TransformWrapper>
        </div>
    );
};
