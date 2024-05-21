import { Modal } from "@mantine/core";
import React, { FC, useEffect } from "react";

import { useModal } from "@/states/Modal";

type props = {
    icon: React.ReactElement;
    modalContent: React.ReactElement;
};

export const ToolButtonWithModal: FC<props> = (props) => {
    const { icon, modalContent } = props;

    const {
        isOpen,
        createModalContentElement,
        buttonRef,
        mutator: { closeModal, decideModalLoc },
        handler: { handleClick: onClick },
    } = useModal();

    useEffect(() => {
        window.addEventListener("resize", decideModalLoc);

        return () => {
            window.removeEventListener("resize", decideModalLoc);
        };
    }, [decideModalLoc]);

    const modalContentElement = createModalContentElement(modalContent);

    return (
        <div className="relative">
            <button ref={buttonRef} onClick={onClick} className="relative">
                <span className="peer">{icon}</span>
            </button>
            <Modal opened={isOpen} onClose={closeModal} withCloseButton={false}>
                {modalContentElement}
            </Modal>
        </div>
    );
};
