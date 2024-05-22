/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { MouseEventHandler, useCallback, useState } from "react";

export const useButton = (onClick: MouseEventHandler<HTMLButtonElement>) => {
    const [isSelected, setIsSelected] = useState(false);
    const toggleIsSelected = useCallback(() => {
        setIsSelected((prev) => !prev);
    }, [setIsSelected]);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            onClick(e);
            toggleIsSelected();
        },
        [toggleIsSelected]
    );

    return {
        isSelected,
        handler: {
            handleClick,
        },
    };
};
