/*
 * import { Input } from "@twilio-paste/core/input";
 * import { Label } from "@twilio-paste/core/label";
 */
import { Box } from "@twilio-paste/core/box";
// import { TextArea } from "@twilio-paste/core/textarea";
import { FormEvent, useCallback } from "react";
import { Button } from "@twilio-paste/core/button";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "@twilio-paste/core/text";

import { sessionDataHandler } from "../../sessionDataHandler";
import { addNotification, changeEngagementPhase } from "../../store/actions/genericActions";
// updatePreEngagementData
import { initSession } from "../../store/actions/initActions";
import { AppState, EngagementPhase, PreEngagementFormPhase } from "../../store/definitions";
import { Header } from "../Header";
import { notifications } from "../../notifications";
import { NotificationBar } from "../NotificationBar";
import { introStyles, formStyles, buttonItemStyles } from "../styles/PreEngagementForm.styles";
import { HelpMenu } from "./HelpMenu";
import { ExistingBooking } from "./ExistingBooking";
import { GroupBookingEvent } from "./GroupBookingEvent";
import { NewReservationBooking } from "./NewReservationBooking";
import { OtherQuery } from "./OtherQuery";

export const PreEngagementForm = () => {
    const { name, email, query } = useSelector((state: AppState) => state.session.preEngagementData) || {};
    const phase = useSelector((state: AppState) => state.session.currentPreEngagementPhase);
    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(changeEngagementPhase({ phase: EngagementPhase.Loading }));
        try {
            const data = await sessionDataHandler.fetchAndStoreNewSession({
                formData: {
                    friendlyName: name,
                    email,
                    query,
                    nick: "nick"
                }
            });
            dispatch(initSession({ token: data.token, conversationSid: data.conversationSid }));
        } catch (err) {
            dispatch(addNotification(notifications.failedToInitSessionNotification((err as Error).message)));
            dispatch(changeEngagementPhase({ phase: EngagementPhase.PreEngagementForm }));
        }
    };

    const renderContent = useCallback(() => {
        switch (phase) {
            case PreEngagementFormPhase.SelectHelpCategory:
                return <HelpMenu />;
            case PreEngagementFormPhase.NewReservation:
                return <NewReservationBooking />;
            case PreEngagementFormPhase.ExistingBooking:
                return <ExistingBooking />;
            case PreEngagementFormPhase.GroupBookingEvent:
                return <GroupBookingEvent />;
            case PreEngagementFormPhase.OtherQuery:
                return <OtherQuery />;
            default:
                return <></>;
        }
    }, [phase]);

    /*
     * const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
     *     if (e.key === "Enter" && !e.shiftKey) {
     *         e.preventDefault();
     *         handleSubmit(e);
     *     }
     * };
     */

    return (
        <>
            <Header customTitle="Chat with us" />
            <NotificationBar />
            <Box as="form" data-test="pre-engagement-chat-form" onSubmit={handleSubmit} {...formStyles}>
                {renderContent()}
                {/* <Box {...fieldStyles}>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        placeholder="Please enter your name"
                        name="name"
                        data-test="pre-engagement-chat-form-name-input"
                        value={name}
                        onChange={(e) => dispatch(updatePreEngagementData({ name: e.target.value }))}
                        required
                    />
                </Box> */}
                {/* <Box {...fieldStyles}>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        type="email"
                        placeholder="Please enter your email address"
                        name="email"
                        data-test="pre-engagement-chat-form-email-input"
                        value={email}
                        onChange={(e) => dispatch(updatePreEngagementData({ email: e.target.value }))}
                        required
                    />
                </Box> */}
                {/* 
                <Box {...fieldStyles}>
                    <Label htmlFor="query">How can we help you?</Label>
                    <TextArea
                        placeholder="Ask a question"
                        name="query"
                        data-test="pre-engagement-chat-form-query-textarea"
                        value={query}
                        onChange={(e) => dispatch(updatePreEngagementData({ query: e.target.value }))}
                        onKeyPress={handleKeyPress}
                        required
                    />
                </Box> */}

                {/* <Button variant="primary" type="submit" data-test="pre-engagement-start-chat-button">
                    Start chat
                </Button> */}
            </Box>
        </>
    );
};