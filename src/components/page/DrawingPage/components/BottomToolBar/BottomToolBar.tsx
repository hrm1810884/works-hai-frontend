import { FC, useState, useEffect } from "react";

import { bottomToolBarStyle, toolButtonsContainerStyle, textSpanStyle } from "./BottomToolBar.css";

import { GenerationButton } from "../GenerationButton";

import { useCanvas } from "@/states/Canvas";



type Props = {
    onClick: () => void;
};

export const BottomToolBar: FC<Props> = (props) => {
    const {onClick: openModal} = props;

    const { whitePixelsProportion } = useCanvas();


    return (
        <div className={bottomToolBarStyle}>
            <div className={toolButtonsContainerStyle}>
                <div className={textSpanStyle}>
                    <div>キャンバス周辺部分の余白の割合: {Math.round(whitePixelsProportion * 1000) / 10}%</div>
                    <div>30%を下回ると完了ボタンが押せるようになります</div>
                </div>
                {whitePixelsProportion < 0.3 ?
                <GenerationButton text="完了" onClick={openModal} />
                : null}
            </div>
        </div>
    );
};
