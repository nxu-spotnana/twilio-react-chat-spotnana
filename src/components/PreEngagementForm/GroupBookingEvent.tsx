import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { TextArea } from "@twilio-paste/core/textarea";
import { Button } from "@twilio-paste/core/button";

import { introStyles, formStyles, buttonItemStyles } from "../styles/PreEngagementForm.styles";

export function GroupBookingEvent() {
    return (
        <>
            <Box as="div">
                <Button variant="link">&lt; back to chat with bot</Button>
            </Box>
            <Text {...introStyles} as="p">
                We are connecting you to an agent...
            </Text>
            <Text {...introStyles} as="p" style={{ fontSize: "16px", color: "#4E5056", marginBottom: "3rem" }}>
                Please select what do you need help with
            </Text>
        </>
    );
}
