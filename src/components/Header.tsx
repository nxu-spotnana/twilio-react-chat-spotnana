import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { Button } from "@twilio-paste/core/button";
import { CloseIcon } from "@twilio-paste/icons/esm/CloseIcon";

import { containerStyles, titleStyles } from "./styles/Header.styles";

export const Header = ({ customTitle }: { customTitle?: string }) => {
    return (
        <Box as="header" {...containerStyles} style={{ paddingRight: "1rem" }}>
            <Text as="h2" {...titleStyles}>
                {customTitle || "Live Chat"}
            </Text>
            <Box style={{ float: "right" }}>
                {/* <Button size="icon" title="close">
                    X
                </Button> */}
                <Button variant="secondary_icon" size="reset">
                    <CloseIcon decorative={false} size="sizeIcon40" title="close" />
                </Button>
            </Box>
        </Box>
    );
};
