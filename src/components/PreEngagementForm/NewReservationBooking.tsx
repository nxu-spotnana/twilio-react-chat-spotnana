import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { TextArea } from "@twilio-paste/core/textarea";
import { Button } from "@twilio-paste/core/button";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@twilio-paste/core/checkbox";
import { useCallback, useState } from "react";

import { notifications } from "../../notifications";
import { AppState, EngagementPhase, PreEngagementFormPhase } from "../../store/definitions";
import { introStyles, formStyles, buttonItemStyles } from "../styles/PreEngagementForm.styles";
import { updateNewBookingData, changeEngagementPhase, addNotification } from "../../store/actions/genericActions";
import { sessionDataHandler } from "../../sessionDataHandler";
import { initSession } from "../../store/actions/initActions";

export function NewReservationBooking() {
    const dispatch = useDispatch();
    const { isAir, isCar, isHotel, isOthers, isRail, travelDetail } = useSelector((state: AppState) => {
        return state.session.preEngagementNewBooking;
    });

    const handleClick = useCallback(async () => {
        console.log("submit btn triggered...");

        dispatch(changeEngagementPhase({ phase: EngagementPhase.Loading }));

        try {
            const data = await sessionDataHandler.fetchAndStoreNewSession({
                formData: {
                    friendlyName: "nick", // TODO: find it from OBT data
                    email: "email@email.com", // TODO: find it from OBT
                    // TODO: add other essential data, check Studio flow
                    isAir,
                    isCar,
                    isHotel,
                    isOthers,
                    isRail,
                    travelDetail,
                    preEngagementPhase: PreEngagementFormPhase.NewReservation
                }
            });

            dispatch(initSession({ token: data.token, conversationSid: data.conversationSid }));
        } catch (err) {
            dispatch(addNotification(notifications.failedToInitSessionNotification((err as Error).message)));
            dispatch(changeEngagementPhase({ phase: EngagementPhase.PreEngagementForm }));
        }
    }, []);

    return (
        <>
            <Box as="div">
                <Button variant="link">&lt; back to chat with bot</Button>
            </Box>
            <Text {...introStyles} as="p">
                We are connecting you to an agent...
            </Text>
            <Text {...introStyles} as="p" style={{ fontSize: "16px", color: "#4E5056", marginBottom: "3rem" }}>
                Select the travel booking you want to make
            </Text>
            <Box as="div">
                <Checkbox
                    checked={isAir}
                    id="new-reservation-air"
                    value="air"
                    name="new-reservation-air"
                    onChange={(event) => {
                        dispatch(updateNewBookingData({ isAir: event.target.checked }));
                    }}
                >
                    Air
                </Checkbox>
            </Box>
            <Box as="div">
                <Checkbox
                    checked={isHotel}
                    id="new-reservation-hotel"
                    value="hotel"
                    name="new-reservation-hotel"
                    onChange={(event) => {
                        dispatch(updateNewBookingData({ isHotel: event.target.checked }));
                    }}
                >
                    Hotel
                </Checkbox>
            </Box>
            <Box as="div">
                <Checkbox
                    checked={isCar}
                    id="new-reservation-car"
                    value="car"
                    name="new-reservation-car"
                    onChange={(event) => {
                        dispatch(updateNewBookingData({ isCar: event.target.checked }));
                    }}
                >
                    Car
                </Checkbox>
            </Box>
            <Box as="div">
                <Checkbox
                    checked={isRail}
                    id="new-reservation-rail"
                    value="rail"
                    name="new-reservation-rail"
                    onChange={(event) => {
                        dispatch(updateNewBookingData({ isRail: event.target.checked }));
                    }}
                >
                    Rail
                </Checkbox>
            </Box>
            <Box as="div">
                <Checkbox
                    checked={isOthers}
                    id="new-reservation-other"
                    value="other"
                    name="new-reservation-other"
                    onChange={(event) => {
                        dispatch(updateNewBookingData({ isOthers: event.target.checked }));
                    }}
                >
                    Other
                </Checkbox>
            </Box>
            <Text as="p" style={{ fontSize: "16px", color: "#4E5056" }}>
                What was the problem you encountered?Error, Credit card failure, Price discrepancyor Other...
            </Text>
            <TextArea
                placeholder="Type travel details..."
                name="travel-detail"
                data-test="pre-engagement-travel-detail-textarea"
                value={travelDetail}
                onChange={(e) => dispatch(updateNewBookingData({ travelDetail: e.target.value }))}
            />
            <Box as="div">
                <Button variant="primary" fullWidth onClick={handleClick}>
                    Submit
                </Button>
            </Box>
        </>
    );
}
