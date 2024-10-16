import { Button, Center, Modal } from "@mantine/core";
import Image from "next/image";
import { FC, useEffect } from "react";

import { useCanvas } from "@/states/Canvas";
import { stageSwitcher } from "@/utils";

import { useConfirm } from "./hooks";

import { imageStyle, modalContentStyle } from "./GenerationModal.css";

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
        isButtonDisabled, setIsButtonDisabled
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
            classNames={{ content: modalContentStyle }}
        >
            <Image
                src={imgSrc}
                alt="canvas image"
                width={512}
                height={512}
                className={imageStyle}
            />
            <Center>
                <Button
                    onClick={async () => {
                        const handleClick = stageSwitcher(stage, {
                            pre: async () => {
                                setIsButtonDisabled(true);
                                await handlePreClick();
                                setIsButtonDisabled(false);
                            },
                            post: async () => {
                                setIsButtonDisabled(true);
                                await handlePostClick();
                                handleClose();
                                setIsButtonDisabled(false);
                            },
                        });
                        await handleClick();
                    }}
                    disabled={isButtonDisabled}
                >
                    {stageSwitcher(stage, { pre: "生成する", post: "終了する" })}
                </Button>
            </Center>
        </Modal>
    );
};
