import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

// FIXME: space-between効いてない
export const sendButtonStyle = style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "10rem",
    height: "3rem",
    fontSize: vars.fontSizes.xl,
    padding: `${vars.spacing.md} 0 ${vars.spacing.md} ${vars.spacing.md}`,
    color: vars.colors.primary[4],
    border: `1px solid ${vars.colors.primary[4]}`,
});
