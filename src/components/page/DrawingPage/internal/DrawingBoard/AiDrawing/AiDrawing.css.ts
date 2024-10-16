import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const imageContainerStyle = style({
    position: "relative",
    width: "100%`",
    height: "100%`",
});

export const noImageStyle = style({
    width: "100%",
    height: "100%",
    backgroundColor: vars.colors.gray[3],
});
