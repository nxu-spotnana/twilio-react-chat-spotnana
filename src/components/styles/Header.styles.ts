import { BoxStyleProps } from "@twilio-paste/core/box";
import { TextStyleProps } from "@twilio-paste/core/text";

export const containerStyles: BoxStyleProps = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "colorBackgroundBody",
    padding: "space20",
    paddingTop: "space40",
    paddingBottom: "space40",
    borderTopLeftRadius: "borderRadius20",
    borderTopRightRadius: "borderRadius20"
};

export const titleStyles: TextStyleProps = {
    fontFamily: "fontFamilyText",
    color: "colorText",
    fontSize: "fontSize60",
    fontWeight: "fontWeightSemibold",
    paddingLeft: "space30"
};
