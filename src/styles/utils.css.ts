import { style } from "@vanilla-extract/css";

export const styleUtils = {
    contentWrapper: style({
        position: "relative",
        width: "100vw",
        height: "95vh",
        backgroundColor: "#e5e7eb", // Corresponds to bg-neutral-200
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }),
};
