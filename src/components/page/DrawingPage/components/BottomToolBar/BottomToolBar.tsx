import { FC } from "react";

import { useCanvas } from "@/states/Canvas";

import { GenerationButton } from "../GenerationButton";

import { bottomToolBarStyle, toolButtonsContainerStyle, textSpanStyle } from "./BottomToolBar.css";

type Props = {
    onClick: () => void;
};

export const BottomToolBar: FC<Props> = (props) => {
    const { onClick: openModal } = props;

    const { densityValidation } = useCanvas();

    return (
        <div className={bottomToolBarStyle}>
            <div className={toolButtonsContainerStyle}>
                <div className={textSpanStyle}>
                    <div>キャンバス周辺部分の余白の割合: {Math.round(densityValidation.whitePixelsProportion * 1000) / 10}%</div>
                    <div>30%を下回ると完了ボタンが押せるようになります</div>
                </div>
                {densityValidation.validated ?
                <GenerationButton text="完了" onClick={openModal} />
                : null}
            </div>
        </div>
    );
};
