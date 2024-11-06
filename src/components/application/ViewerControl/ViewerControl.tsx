import { FC } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { SlReload } from "react-icons/sl";
import { useControls } from "react-zoom-pan-pinch";

import { useViewer } from "@/page/ViewerPage/hooks";
import { getAbsoluteVectorToShiftForCentering } from "@/utils/viewer";

import { IconButton } from "@/components/common/ui";

import { controlWrapper } from "./ViewerControl.css";

export const ViewerControl: FC = () => {
    const { zoomIn, zoomOut, setTransform } = useControls();
    const { data } = useViewer();

    return (
        <div className={controlWrapper}>
            <IconButton
                onClick={() => zoomIn()}
                variant="transparent"
                color="white"
                icon={FiPlus}
            />
            <IconButton
                onClick={() => zoomOut()}
                variant="transparent"
                color="white"
                icon={FiMinus}
            />
            <IconButton
                onClick={() => {
                    const center = getAbsoluteVectorToShiftForCentering(
                        data.length,
                        window.innerHeight
                    );
                    setTransform(center.width, center.height, 1);
                }}
                variant="transparent"
                color="white"
                icon={SlReload}
            />
        </div>
    );
};
