import { FC } from "react";
import { IoMdSend } from "react-icons/io";

import { isDrawnValidly } from "@/model/drawing.selector";
import { useCanvas } from "@/states/Canvas";
import { Now } from "@/utils/switchByEnv";

import { ButtonWithIcon } from "@/components/common/ui/";

import { bottomToolBarStyle, textSpanStyle, toolButtonsContainerStyle } from "./BottomToolBar.css";

type Props = {
    onClick: () => void;
};

export const BottomToolBar: FC<Props> = (props) => {
    const { onClick: openModal } = props;

    const { whitePixelsProportion } = useCanvas();

    /**
     * TODO: 開発が進み次第削除する
     */
    const enableValidation = false;

    return (
        <div className={bottomToolBarStyle}>
            <div className={toolButtonsContainerStyle}>
                {/**
                 * NOTE: ローカル環境ではバリデーションをストップ
                 * enableする際にはenableValidationをtrueにする
                 */}
                {Now.isLocal && !enableValidation ? (
                    <ButtonWithIcon type="submit" text="完了" icon={IoMdSend} onClick={openModal} />
                ) : (
                    <>
                        <div className={textSpanStyle}>
                            <p>{`キャンバス周辺部分の余白の割合: ${(whitePixelsProportion * 100).toFixed(1)}%`}</p>
                            <p>30%を下回ると完了ボタンが押せるようになります</p>
                        </div>
                        <ButtonWithIcon
                            type="submit"
                            text="完了"
                            icon={IoMdSend}
                            onClick={openModal}
                            disabled={!isDrawnValidly(whitePixelsProportion)}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
