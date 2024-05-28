import { style } from "@vanilla-extract/css";

export const styleUtils = {
    wrapperStyle: style({
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }),
};
