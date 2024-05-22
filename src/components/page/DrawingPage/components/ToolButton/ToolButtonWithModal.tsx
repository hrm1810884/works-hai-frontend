import { Modal } from "@mantine/core";
import React, { FC, useEffect } from "react";

import { useModal } from "@/states/Modal";

import { toolButtonStyle } from "./ToolButton.css";

type props = {
    icon: React.ReactElement;
    modalContent: React.ReactElement;
};

export const ToolButtonWithModal: FC<props> = (props) => {
    const { icon, modalContent } = props;

    const {
        isOpen,
        modalLoc,
        ref: { modalRef, buttonRef },
        mutator: { closeModal, decideModalLoc },
        handler: { handleClick: onClick },
    } = useModal();

    useEffect(() => {
        window.addEventListener("resize", decideModalLoc);

        return () => {
            window.removeEventListener("resize", decideModalLoc);
        };
    }, [decideModalLoc]);

    return (
        <div>
            <button ref={buttonRef} onClick={onClick} className={toolButtonStyle}>
                <span>{icon}</span>
            </button>
            <Modal
                ref={modalRef}
                opened={isOpen}
                onClose={closeModal}
                withCloseButton={false}
                style={{ position: "absolute", left: modalLoc.x, top: modalLoc.y + 50 }}
            >
                {modalContent}
            </Modal>
        </div>
    );
};
