import { Center, Modal } from "@mantine/core";
import Image from "next/image";
import { FC, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { LiaBrushSolid } from "react-icons/lia";

import { useCanvas } from "@/states/Canvas";
import { useOverlayLoadingState } from "@/states/Loader";
import { stageSwitcher } from "@/utils";
import { getDrawingLink } from "@/utils/getDrawingLink";

import { useConfirm } from "./hooks";

import { ButtonWithIcon } from "@/components/common/ui";
import { OverlayLoading } from "@/components/common/ui/OverlayLoading";

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
    const { canvasRef } = useCanvas();

    const { runWithLoading } = useOverlayLoadingState();

    useEffect(() => {
        if (isOpen) {
            const canvasSrc = getDrawingLink(canvasRef.current);
            setImgSrc(canvasSrc);
        }
    }, [isOpen, canvasRef, setImgSrc]);

    return (
        <Modal
            opened={isOpen}
            onClose={handleClose}
            closeOnClickOutside={false}
            closeOnEscape={false}
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
            <OverlayLoading />
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
                            onClick={runWithLoading(handlePreClick)}
                        />
                    ),
                    post: (
                        <ButtonWithIcon
                            text="終了する"
                            icon={FaCircleCheck}
                            onClick={async () => {
                                await handlePostClick();
                                handleClose();
                            }}
                        />
                    ),
                })}
            </Center>
        </Modal>
    );
};
