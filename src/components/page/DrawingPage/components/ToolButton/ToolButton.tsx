import { Button } from "@mantine/core";
import React, { FC } from "react";

import { selectedIconHighlightStyle, toolButtonStyle } from "./ToolButton.css";

type props = {
    icon: React.ReactElement;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    isSelected?: boolean;
    isDisabled?: boolean;
};

export const ToolButton: FC<props> = (props) => {
    const { icon, onClick, isSelected, isDisabled } = props;

    return (
        <div style={{ position: "relative" }}>
            <Button
                onClick={onClick}
                disabled={isDisabled}
                className={`${isSelected ? selectedIconHighlightStyle : undefined} ${toolButtonStyle}`}
            >
                <span>{icon}</span>
                {isSelected && <div className={selectedIconHighlightStyle}></div>}
            </Button>
        </div>
    );
};
