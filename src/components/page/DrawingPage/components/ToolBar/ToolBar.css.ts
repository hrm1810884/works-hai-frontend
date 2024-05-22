import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme";

export const barContainerStyle = style({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "1rem",
    backgroundColor: vars.colors.primary[4], // bg-neutral-100
    borderBottom: "1px solid #d1d1d1",
    "@media": {
        "screen and (min-width: 768px)": {
            paddingTop: "0",
            paddingBottom: "0",
            height: "3rem",
            flexDirection: "row",
        },
    },
});

export const buttonsContainerStyle = style({
    display: "flex",
    height: "100%",
    margin: "2rem 5rem",
    gap: "0.75rem", // 3 * 0.25rem = 0.75rem
    justifyContent: "center",
    alignItems: "center",
});

export const toolButtonsContainerStyle = style({
    display: "flex",
    height: "100%",
    gap: "0.75rem",
    margin: "2rem 5rem 2rem 0",
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
    border: "1px solid #d1d1d1",
    borderRadius: "0.5rem",
    cursor: "pointer",
});

export const iconStyle = style({
    display: "flex",
    width: "2rem",
    height: "1.9rem",
});
