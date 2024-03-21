import { Box } from "@twilio-paste/core/box";
import { Button } from "@twilio-paste/core/button";
import { Text } from "@twilio-paste/core/text";
import { ChevronRightIcon } from "@twilio-paste/icons/esm/ChevronRightIcon";
import { useCallback, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changePreEngagementPhase } from "../../store/actions/genericActions";
import { introStyles, formStyles, buttonItemStyles } from "../styles/PreEngagementForm.styles";
import { PreEngagementFormPhase } from "../../store/definitions";

declare global {
    interface Window {
        twilioChatSupport: {
            nick: string;
        };
    }
}
export function HelpMenu() {
    const dispatch = useDispatch();
    const handleClick = useCallback((phase: PreEngagementFormPhase) => {
        dispatch(changePreEngagementPhase({ phase }));
    }, []);

    return (
        <>
            <Box as="div">
                <Button variant="link">&lt; back to chat with bot</Button>
                {window.twilioChatSupport?.nick}
            </Box>
            <Text {...introStyles} as="p">
                We are connecting you to an agent...
            </Text>
            <Text {...introStyles} as="p" style={{ fontSize: "16px", color: "#4E5056", marginBottom: "3rem" }}>
                Please select what do you need help with
            </Text>
            <Box as="div" {...buttonItemStyles}>
                <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => handleClick(PreEngagementFormPhase.NewReservation)}
                >
                    New reservation booking
                    <ChevronRightIcon decorative={false} title="Next step" />
                </Button>
            </Box>
            <Box as="div" {...buttonItemStyles}>
                <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => handleClick(PreEngagementFormPhase.ExistingBooking)}
                >
                    Need help with existing booking
                    <ChevronRightIcon decorative={false} title="Next step" />
                </Button>
            </Box>
            <Box as="div" {...buttonItemStyles}>
                <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => handleClick(PreEngagementFormPhase.GroupBookingEvent)}
                >
                    Group bookings & events
                    <ChevronRightIcon decorative={false} title="Next step" />
                </Button>
            </Box>
            <Box as="div" {...buttonItemStyles}>
                <Button variant="secondary" fullWidth onClick={() => handleClick(PreEngagementFormPhase.OtherQuery)}>
                    Other query
                    <ChevronRightIcon decorative={false} title="Next step" />
                </Button>
            </Box>
        </>
    );
}
