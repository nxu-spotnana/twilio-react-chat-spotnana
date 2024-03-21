import { Client, Conversation, Participant, Message, User } from "@twilio/conversations";
import { GenericThemeShape } from "@twilio-paste/theme";
import { AlertVariants } from "@twilio-paste/core/alert";

import { FileAttachmentConfig, TranscriptConfig } from "../definitions";

export enum EngagementPhase {
    PreEngagementForm = "PreEngagementForm",
    MessagingCanvas = "MessagingCanvas",
    Loading = "Loading"
}

// eslint-disable-next-line import/no-unused-modules
export enum PreEngagementFormPhase {
    SelectHelpCategory = "SelectHelpCategory",
    NewReservation = "NewReservation",
    ExistingBooking = "ExistingBooking",
    GroupBookingEvent = "GroupBookingEvent",
    OtherQuery = "OtherQuery"
}

export type ChatState = {
    conversationsClient?: Client;
    conversation?: Conversation;
    participants?: Participant[];
    users?: User[];
    messages?: Message[];
    attachedFiles?: File[];
    conversationState?: string;
};

export type PreEngagementData = { name: string; email: string; query: string };
export type NewBookingData = {
    isAir: boolean;
    isHotel: boolean;
    isCar: boolean;
    isRail: boolean;
    isOthers: boolean;
    travelDetail: string;
};
export type ExistingBookingData = {
    tripId: string;
    bookingId: string;
};

export type GroupBookingData = {
    travelDetail: string;
};

export type OtherQueryData = {
    travelDetail: string;
};
export type SessionState = {
    currentPreEngagementPhase: PreEngagementFormPhase;
    currentPhase: EngagementPhase;
    expanded: boolean;
    token?: string;
    conversationSid?: string;
    conversationsClient?: Client;
    conversation?: Conversation;
    users?: User[];
    participants?: Participant[];
    messages?: Message[];
    conversationState?: "active" | "inactive" | "closed";
    preEngagementData?: PreEngagementData; // not used, will remove

    preEngagementNewBooking: NewBookingData;
    preEngagementExistingBooking: ExistingBookingData;
    preEngagementGroupBooking: GroupBookingData;
    preEngagementOtherQuery: OtherQueryData;
};

export type ConfigState = {
    serverUrl?: string;
    theme?: {
        isLight?: boolean;
        overrides?: Partial<GenericThemeShape>;
    };
    fileAttachment?: FileAttachmentConfig;
    transcript?: TranscriptConfig;
};

export type Notification = {
    dismissible: boolean;
    id: string;
    onDismiss?: () => void;
    message: string;
    timeout?: number;
    type: AlertVariants;
};

export type NotificationState = Notification[];

export type AppState = {
    chat: ChatState;
    config: ConfigState;
    session: SessionState;
    notifications: NotificationState;
};
