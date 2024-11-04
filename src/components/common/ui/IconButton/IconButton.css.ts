import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const iconButtonStyle = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: vars.spacing.sm,
    width: "fit-content",
    height: "fit-content",
    backgroundColor: vars.colors.dark[9],
});
