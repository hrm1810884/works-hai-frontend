import { FC } from "react";
import { IconType } from "react-icons/lib";

import { IconButton } from "@/components/common/ui";

import { vars } from "@/styles";

type props = {
    icon: IconType;
    onColorChange: (_color: string) => void;
};

export const ColorDropper: FC<props> = ({ icon, onColorChange: handleColorChange }) => {
    const changePickedColor = async () => {
        if (!("EyeDropper" in window)) {
            console.error(`Your browser does not support the EyeDropper API`);
            return;
        }

        const eyeDropper = new (window as any).EyeDropper();

        try {
            const pickedColor = await eyeDropper.open();
            handleColorChange(pickedColor.sRGBHex);
        } catch (e) {
            console.error(`Error: ${e}`);
        }
    };

    return (
        <IconButton
            variant="transparent"
            color={vars.colors.white}
            icon={icon}
            onClick={changePickedColor}
        />
    );
};
