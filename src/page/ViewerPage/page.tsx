"use client";
import { FC, useEffect } from "react";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";

import { getAbsoluteVectorToShiftForCentering } from "@/utils/viewer";

import { useViewer } from "./hooks";

import { ViewerCard } from "@/components/application/ViewerCard";
import { ViewerControl } from "@/components/application/ViewerControl";
import { ViewerGrid } from "@/components/application/ViewerGrid";

import { viewerGrid, wrapper } from "./page.css";

export const ViewerPage = () => {
    return (
        <div className={wrapper}>
            <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
                minScale={0} // 無限ズームアウトを可能にする
                limitToBounds={false}
            >
                <>
                    <ViewerControl />
                    <TransformComponent>
                        <InternalPage />
                    </TransformComponent>
                </>
            </TransformWrapper>
        </div>
    );
};

const InternalPage: FC = () => {
    const { data } = useViewer();
    const { setTransform } = useControls();

    useEffect(() => {
        if (data) {
            const center = getAbsoluteVectorToShiftForCentering(data.length, window.innerHeight);
            setTimeout(() => {
                setTransform(center.width, center.height, 1);
            }, 0);
        }
    }, [data, setTransform]);

    return (
        <ViewerGrid className={viewerGrid}>
            {data.map((img, index) => (
                <ViewerCard key={index} x={img.position.x} y={img.position.y} src={img.url} />
            ))}
        </ViewerGrid>
    );
};
