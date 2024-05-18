import React, { FC } from "react";

type props = {
    icon: React.ReactElement;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    isSelected?: boolean;
};

export const ToolButton: FC<props> = (props) => {
    const { icon, onClick, isSelected } = props;

    return (
        <div className="relative">
            <div onClick={onClick} className="relative">
                <span className={"peer " + (isSelected && "text-indigo-600")}>{icon}</span>
                {isSelected && (
                    <div className="absolute h-1 w-5 bg-indigo-500 rounded-t-lg left-1/2 -translate-x-1/2 translate-y-1.5"></div>
                )}
            </div>
        </div>
    );
};
