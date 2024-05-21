import { style } from "@vanilla-extract/css";

export const barContainer = style({
    width: "95%",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    "@media": {
        "screen and (min-width: 768px)": {
            paddingTop: "0",
            paddingBottom: "0",
            height: "3rem",
            flexDirection: "row",
        },
    },
    height: "8rem",
    backgroundColor: "#f5f5f5", // bg-neutral-100
    borderBottom: "1px solid #d1d1d1", // border-neutral-300
    paddingLeft: "1.25rem",
    paddingRight: "1.25rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#4a4a4a", // text-neutral-600
    zIndex: 50,
});

export const buttonContainer = style({
    display: "flex",
    height: "100%",
    gap: "0.75rem", // 3 * 0.25rem = 0.75rem
    justifyContent: "center",
    alignItems: "center",
});

export const toolButtonContainer = style({
    display: "flex",
    height: "100%",
    gap: "0.75rem", // 3 * 0.25rem = 0.75rem
    justifyContent: "center",
    alignItems: "center",
    order: 3,
    "@media": {
        "screen and (min-width: 768px)": {
            order: "initial",
        },
    },
});

export const colorPaletteIcon = style({
    height: "1.5rem",
    width: "1.5rem",
    border: "1px solid #d1d1d1",
    borderRadius: "0.5rem",
    cursor: "pointer",
});
