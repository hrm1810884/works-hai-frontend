import React, { FC } from "react";

type props = {
    icon: React.ReactElement;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    isSelected?: boolean;
    isDisabled?: boolean;
};

export const ToolButton: FC<props> = (props) => {
    const { icon, onClick, isSelected, isDisabled } = props;

    return (
        <div className="relative">
            <button onClick={onClick} className="relative" disabled={isDisabled}>
                <span className={"peer " + (isSelected && "text-indigo-600")}>{icon}</span>
                {isSelected && (
                    <div className="absolute h-1 w-5 bg-indigo-500 rounded-t-lg left-1/2 -translate-x-1/2 translate-y-1.5"></div>
                )}
            </button>
        </div>
    );
};
