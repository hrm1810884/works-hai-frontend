import { FC } from "react";
import { IoMdSend } from "react-icons/io";

import { useCanvas } from "@/states/Canvas";
import { Now } from "@/utils/switchByEnv";

import { ButtonWithIcon } from "@/components/common/ui/";

import { bottomToolBarStyle, textSpanStyle, toolButtonsContainerStyle } from "./BottomToolBar.css";

type Props = {
    onClick: () => void;
};

export const BottomToolBar: FC<Props> = (props) => {
    const { onClick: openModal } = props;

    const { densityValidation } = useCanvas();

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
                            <div>
                                キャンバス周辺部分の余白の割合:{" "}
                                {Math.round(densityValidation.whitePixelsProportion * 1000) / 10}%
                            </div>
                            <div>30%を下回ると完了ボタンが押せるようになります</div>
                        </div>
                        {densityValidation.validated ? (
                            <ButtonWithIcon
                                type="submit"
                                text="完了"
                                icon={IoMdSend}
                                onClick={openModal}
                            />
                        ) : null}
                    </>
                )}
            </div>
        </div>
    );
};