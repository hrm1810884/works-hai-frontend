import { Center, Modal, ActionIcon } from "@mantine/core";
import Image from "next/image";
import { FC, useEffect } from "react";

import { FaCircleCheck } from "react-icons/fa6";
import { LiaBrushSolid } from "react-icons/lia";

import { useCanvas } from "@/states/Canvas";
import { stageSwitcher } from "@/utils";

import { vars } from "@/styles";

import { useConfirm } from "./hooks";

import { imageStyle, modalContentStyle, modalBodyStyle, modalHeaderStyle, sendButtonStyle } from "./GenerationModal.css";

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
            // opened={true}
            onClose={handleClose}
            title={ stageSwitcher(stage, {
                pre: "こちらでよろしいでしょうか？",
                post: "生成が完了しました",
            })}
            // className={modalBodyStyle }
            classNames={{content: modalContentStyle, body: modalBodyStyle, header: modalHeaderStyle}}
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
                    <ActionIcon
                        type="submit"
                        variant="filled"
                        color={vars.colors.white}
                        radius={vars.radius.lg}
                        onClick={async () => {
                            const handleClick = stageSwitcher(stage, {
                                pre: async () => {
                                    await handlePreClick();
                                },
                                post: async () => {
                                    await handlePostClick();
                                    handleClose();
                                },
                            });
                            await handleClick();
                        }}
                        className={sendButtonStyle}
                    >
                        {stageSwitcher(stage, { 
                            pre: (
                            <>
                            <span style={{ marginRight: vars.spacing.sm }}>
                                生成する
                            </span>
                            <LiaBrushSolid style={{ display: "flex" }}></LiaBrushSolid>
                            </>
                            ), 
                            post: (
                            <>
                                <span style={{ marginRight: vars.spacing.sm }}>
                                    終了する
                                </span>
                                <FaCircleCheck style={{ display: "flex" }}></FaCircleCheck>
                            </>
                            )
                        })}
                    </ActionIcon>

                    {/* <Button
                        onClick={async () => {
                            const handleClick = stageSwitcher(stage, {
                                pre: async () => {
                                    await handlePreClick();
                                },
                                post: async () => {
                                    await handlePostClick();
                                    handleClose();
                                },
                            });
                            await handleClick();
                        }}
                    >
                        {stageSwitcher(stage, { pre: "生成する", post: "終了する" })}
                    </Button> */}
            </Center>
        </Modal>
    );
};
