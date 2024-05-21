import { useClickOutside } from "@mantine/hooks";
import React, { useCallback, useRef, useState } from "react";

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalLoc, setModalLoc] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const decideModalLoc = useCallback(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setModalLoc({ x: rect.left + rect.width / 2, y: rect.top - 10 });
        }
    }, [buttonRef, setModalLoc]);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            e.stopPropagation();

            decideModalLoc();

            setIsOpen((prev) => !prev);
        },
        [setIsOpen, decideModalLoc]
    );

    const modalRef = useClickOutside(() => setIsOpen(false));

    return {
        isOpen,
        modalLoc,
        ref: {
            modalRef,
            buttonRef,
        },
        mutator: {
            closeModal,
            decideModalLoc,
        },
        handler: {
            handleClick,
        },
    };
};
