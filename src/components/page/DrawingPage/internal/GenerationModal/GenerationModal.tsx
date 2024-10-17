import { Center, Modal } from "@mantine/core";
import Image from "next/image";
import { FC, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { LiaBrushSolid } from "react-icons/lia";

import { useCanvas } from "@/states/Canvas";
import { stageSwitcher } from "@/utils";

import { useConfirm } from "./hooks";

import { ButtonWithIcon } from "@/components/common/ui";

import {
    imageStyle,
    modalBodyStyle,
    modalContentStyle,
    modalHeaderStyle,
} from "./GenerationModal.css";

type props = {
    isOpen: boolean;
    onClose: () => void;
};

export const ConfirmModal: FC<props> = ({ isOpen, onClose: handleClose }) => {
    const {
        imgSrc,
        setImgSrc,
        stage,
        handler: { handlePreClick, handlePostClick },
    } = useConfirm();

    const { getDrawingLink } = useCanvas();

    useEffect(() => {
        if (isOpen) {
            const canvasSrc = getDrawingLink();
            setImgSrc(canvasSrc);
        }
    }, [isOpen, getDrawingLink, setImgSrc]);

    return (
        <Modal
            opened={isOpen}
            onClose={handleClose}
            title={stageSwitcher(stage, {
                pre: "こちらでよろしいでしょうか？",
                post: "生成が完了しました",
            })}
            classNames={{
                content: modalContentStyle,
                body: modalBodyStyle,
                header: modalHeaderStyle,
            }}
        >
            <div className={imageStyle}>
                <Image
                    fill
                    sizes="100%"
                    objectFit="contain"
                    src={imgSrc}
                    alt="canvas image"
                    className={imageStyle}
                />
            </div>
            <Center>
                {stageSwitcher(stage, {
                    pre: (
                        <ButtonWithIcon
                            text="生成する"
                            icon={LiaBrushSolid}
                            onClick={async () => await handlePreClick()}
                        />
                    ),
                    post: (
                        <ButtonWithIcon
                            text="終了する"
                            icon={FaCircleCheck}
                            onClick={async () => await handlePostClick()}
                        />
                    ),
                })}
            </Center>
        </Modal>
    );
};
