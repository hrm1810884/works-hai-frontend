import { LoadingOverlay } from "@mantine/core";
import { FC } from "react";

import { useOverlayLoadingState } from "@/states/Loader";

export const OverlayLoading: FC = () => {
    const { isShown } = useOverlayLoadingState();

    return (
        <LoadingOverlay
            zIndex={1000}
            visible={isShown}
            overlayProps={{ radius: "lg", blur: 12, opacity: 0.8 }}
            loaderProps={{ type: "dots" }}
        />
    );
};
