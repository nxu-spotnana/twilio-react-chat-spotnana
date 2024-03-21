import { AnyAction, Reducer } from "redux";

import { EngagementPhase, PreEngagementFormPhase, SessionState, NewBookingData } from "./definitions";
import {
    ACTION_CHANGE_ENGAGEMENT_PHASE,
    ACTION_CHANGE_EXPANDED_STATUS,
    ACTION_START_SESSION,
    ACTION_UPDATE_SESSION_DATA,
    ACTION_UPDATE_PRE_ENGAGEMENT_DATA,
    ACTION_CHANGE_PRE_ENGAGEMENT_PHASE,
    ACTION_UPDATE_PRE_ENGAGEMENT_NEW_BOOKING_DATA,
    ACTION_UPDATE_PRE_ENGAGEMENT_EXISTING_BOOKING_DATA,
    ACTION_UPDATE_PRE_ENGAGEMENT_GROUP_BOOKING_DATA,
    ACTION_UPDATE_PRE_ENGAGEMENT_OTHER_QUERY_DATA
} from "./actions/actionTypes";

const initialState: SessionState = {
    currentPreEngagementPhase: PreEngagementFormPhase.SelectHelpCategory,
    currentPhase: EngagementPhase.Loading,
    expanded: false,
    preEngagementNewBooking: {
        isAir: false,
        isHotel: false,
        isCar: false,
        isRail: false,
        isOthers: false,
        travelDetail: ""
    },
    preEngagementExistingBooking: {
        tripId: "",
        bookingId: ""
    },
    preEngagementGroupBooking: {
        travelDetail: ""
    },
    preEngagementOtherQuery: {
        travelDetail: ""
    },
    preEngagementData: { name: "", query: "", email: "" }
};

export const SessionReducer: Reducer<SessionState, AnyAction> = (
    state: SessionState = initialState,
    action: AnyAction
): SessionState => {
    switch (action.type) {
        case ACTION_START_SESSION: {
            return {
                ...state,
                token: action.payload.token,
                conversationSid: action.payload.conversationSid,
                currentPhase: action.payload.currentPhase
            };
        }

        case ACTION_UPDATE_SESSION_DATA: {
            return {
                ...state,
                token: action.payload.token,
                conversationSid: action.payload.conversationSid
            };
        }

        case ACTION_CHANGE_EXPANDED_STATUS: {
            return {
                ...state,
                expanded: action.payload.expanded
            };
        }

        case ACTION_CHANGE_ENGAGEMENT_PHASE: {
            return {
                ...state,
                currentPhase: action.payload.currentPhase
            };
        }

        case ACTION_CHANGE_PRE_ENGAGEMENT_PHASE: {
            return {
                ...state,
                currentPreEngagementPhase: action.payload.currentPreEngagementPhase
            };
        }

        case ACTION_UPDATE_PRE_ENGAGEMENT_NEW_BOOKING_DATA: {
            return {
                ...state,
                preEngagementNewBooking: {
                    ...state.preEngagementNewBooking,
                    ...action.payload
                }
            };
        }

        case ACTION_UPDATE_PRE_ENGAGEMENT_EXISTING_BOOKING_DATA: {
            return {
                ...state,
                preEngagementExistingBooking: {
                    ...state.preEngagementExistingBooking,
                    ...action.payload
                }
            };
        }

        case ACTION_UPDATE_PRE_ENGAGEMENT_GROUP_BOOKING_DATA: {
            return {
                ...state,
                preEngagementGroupBooking: {
                    ...state.preEngagementGroupBooking,
                    ...action.payload
                }
            };
        }

        case ACTION_UPDATE_PRE_ENGAGEMENT_OTHER_QUERY_DATA: {
            return {
                ...state,
                preEngagementOtherQuery: {
                    ...state.preEngagementOtherQuery,
                    ...action.payload
                }
            };
        }

        case ACTION_UPDATE_PRE_ENGAGEMENT_DATA: {
            return {
                ...state,
                preEngagementData: {
                    ...state.preEngagementData,
                    ...action.payload.preEngagementData
                }
            };
        }

        default:
            return state;
    }
};
