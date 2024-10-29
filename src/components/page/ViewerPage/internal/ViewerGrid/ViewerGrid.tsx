import clsx from "clsx";
import React, { FC } from "react";

import { VIEWER_CARD_SIZE } from "@/model/";

import { useViewer } from "../../hooks";

import { gridStyle } from "./ViewerGrid.css";

type props = {
    children: React.ReactNode;
    className?: string;
};

export const ViewerGrid: FC<props> = ({ children, className }) => {
    const { grid } = useViewer();

    return (
        <div
            className={clsx(gridStyle, className)}
            style={{
                gridTemplateColumns: `repeat(${grid.cols}, ${VIEWER_CARD_SIZE})`,
                gridTemplateRows: `repeat(${grid.rows}, ${VIEWER_CARD_SIZE})`,
            }}
        >
            {children}
        </div>
    );
};
