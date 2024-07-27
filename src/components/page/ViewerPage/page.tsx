"use client";
import { FiMinus, FiPlus } from "react-icons/fi";
import { SlReload } from "react-icons/sl";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";

import { useViewer } from "./hooks";

import { ControlButton, ViewerCard, ViewerGrid } from "./components";

import { controlWrapper, wrapper } from "./page.css";

export const ViewerPage = () => {
    const { data } = useViewer();

    const Control = () => {
        const { zoomIn, zoomOut, resetTransform } = useControls();
        return (
            <div className={controlWrapper}>
                <ControlButton onClick={() => zoomIn()} icon={FiPlus} />
                <ControlButton onClick={() => zoomOut()} icon={FiMinus} />
                <ControlButton onClick={() => resetTransform()} icon={SlReload} />
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
