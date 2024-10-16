"use client";
import React, { useEffect } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { SlReload } from "react-icons/sl";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";

import { useViewer, useViewerTransform } from "./hooks";

import { ControlButton, ViewerCard, ViewerGrid } from "./components";

import { controlWrapper, wrapper } from "./page.css";

export const ViewerPage = () => {
    const { data } = useViewer();
    const absoluteVectorToShiftForCentering  = useViewerTransform();

    type ControlProps = {
        resetTransform: () => void;
    }
    const Control: React.FC<ControlProps> = ({ resetTransform }) => {
        const { zoomIn, zoomOut } = useControls();
        return (
            <div className={controlWrapper}>
                <ControlButton onClick={() => zoomIn()} icon={FiPlus} />
                <ControlButton onClick={() => zoomOut()} icon={FiMinus} />
                <ControlButton onClick={() => resetTransform()} icon={SlReload} />
            </div>
        );
    };

    // ウィンドウリサイズを監視するためのコンポーネント
    type ResetTransformOnResizeProps = {
        resetTransform: () => void;
    }
    const ResetTransformOnResize: React.FC<ResetTransformOnResizeProps> = ({ resetTransform }) => {
        useEffect(() => {
            const handleResize = () => {
                resetTransform();
            };

            handleResize();
            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, [resetTransform]);
        
        return null; // UIには何も表示しない
    };

    return (
        <div className={wrapper}>
            <TransformWrapper 
            initialScale={1} 
            initialPositionX={absoluteVectorToShiftForCentering.width} // data[data.length-1].position.x} 
            initialPositionY={absoluteVectorToShiftForCentering.height} // {data[data.length-1].position.y} 
            limitToBounds={false}
            >
                {({ resetTransform }) => (
                <>
                    <Control resetTransform={resetTransform}/>
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
                    <ResetTransformOnResize resetTransform={resetTransform} />
                </>)}
        </TransformWrapper>
        </div>
    );
};
