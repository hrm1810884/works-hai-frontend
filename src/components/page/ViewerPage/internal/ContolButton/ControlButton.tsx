import { FC } from "react";
import { IconType } from "react-icons/lib";

import { IconButton } from "@/components/common/ui";

type props = {
    icon: IconType;
    onClick: () => void;
};

export const ControlButton: FC<props> = ({ onClick: handleClick, icon }) => {
    return <IconButton onClick={handleClick} variant="white" icon={icon} />;
};
