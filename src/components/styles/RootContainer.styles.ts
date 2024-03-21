import { BoxStyleProps } from "@twilio-paste/core/box";

export const outerContainerStyles: BoxStyleProps = {
    position: "fixed",
    bottom: "space50",
    right: "space60",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    maxWidth: "360px",
    width: "100%"
};

export const innerContainerStyles: BoxStyleProps = {
    width: "100%",
    boxShadow: "shadow",
    display: "flex",
    flexDirection: "column",
    maxWidth: "360px",
    height: "590px",
    marginBottom: "space50",
    borderRadius: "borderRadius30",
    backgroundColor: "colorBackgroundBody"
};
