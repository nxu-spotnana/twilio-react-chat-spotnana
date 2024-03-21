import { BoxStyleProps } from "@twilio-paste/core/box";
import { TextStyleProps } from "@twilio-paste/core/text";

export const formStyles: BoxStyleProps = {
    padding: "space40",
    paddingTop: "space20",
    overflow: "auto"
};

export const floatRight: BoxStyleProps = {
    float: "right",
    display: "inlineBlock"
};

export const titleStyles: TextStyleProps = {
    fontSize: "fontSize60", // 60 is 20px
    fontWeight: "fontWeightMedium",
    marginBottom: "space60"
};

export const introStyles: TextStyleProps = {
    fontSize: "fontSize50",
    margin: "space30"
};

export const fieldStyles: BoxStyleProps = {
    marginBottom: "space70"
};
export const buttonItemStyles: BoxStyleProps = {
    margin: "space50"
};

export const buttonStyle: BoxStyleProps = {
    width: "100%"
};
