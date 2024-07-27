"use client";
import { Button } from "@mantine/core";
import { FiMinus, FiPlus } from "react-icons/fi";
import { SlReload } from "react-icons/sl";
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
                <Button onClick={() => zoomIn()} variant="outline">
                    <FiPlus />
                </Button>
                <Button onClick={() => zoomOut()} variant="outline">
                    <FiMinus />
                </Button>
                <Button onClick={() => resetTransform()} variant="outline">
                    <SlReload />
                </Button>
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
