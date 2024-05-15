"use client";

import { Button } from "@mantine/core";
import { Info, WarningCircle, CheckCircle } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { match } from "ts-pattern";

export default function Home() {
    const ICON_SIZE = "1.5rem";
    type ToastType = "info" | "error" | "success";

    const type: ToastType = "info";

    const toastIcon = (type: ToastType) =>
        match(type)
            .with("info", () => <Info size={ICON_SIZE} />)
            .with("error", () => <WarningCircle size={ICON_SIZE} />)
            .with("success", () => <CheckCircle size={ICON_SIZE} />)
            .exhaustive();

    return (
        <>
            <p>hoge</p>
            <Button
                onClick={() => {
                    toast("hai.", {
                        type: "info",
                        icon: toastIcon(type),
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }}
            >
                Show Toast
            </Button>
        </>
    );
}
