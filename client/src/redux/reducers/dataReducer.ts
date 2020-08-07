import {
  SET_SEARCHED_USERS,
  SEARCH_CONVERSATIONS,
  SET_SELECTED_CONVERSATION,
  SET_CONVERSATIONS,
  SET_MESSAGES,
  SET_NEW_MESSAGE,
  DataActionTypes,
} from "../types";
import { IUser } from "./userReducer";

export interface IMessage {
  _id?: string;
  body: string;
  authorId: string;
  conversationId?: string;
  createdAt: string;
  newConversation: boolean;
}

interface IMembers {
  ids: string[];
  usernames: string[];
}

export interface IConversation {
  members: IMembers;
  _id: string;
  lastMessage: IMessage;
}

export interface ISelectedConversation {
  new: boolean;
  id: string;
  username: string;
}

export interface IDataState {
  searchedUsers: IUser[] | null;
  selectedConversation: ISelectedConversation | null;
  conversations: IConversation[] | null;
  searchConversations: string;
  messages: IMessage[] | null;
}

const initialState: IDataState = {
  searchedUsers: null,
  selectedConversation: null,
  conversations: null,
  searchConversations: "",
  messages: null,
};

export default function (state = initialState, action: DataActionTypes) {
  switch (action.type) {
    case SET_SEARCHED_USERS:
      return {
        ...state,
        // shows only users with whom we don't have conversation started
        searchedUsers: action.payload.filter((user) => {
          if (user._id !== localStorage.getItem("userId"))
            return state.conversations?.every(
              (conversation) => !conversation.members.ids.includes(user._id)
            );
          // else case is when user search for himself
          else
            return state.conversations?.every(
              (conversation) =>
                !conversation.members.ids.every((id) => id === user._id)
            );
        }),
      };
    case SET_SELECTED_CONVERSATION:
      return { ...state, selectedConversation: action.payload };
    case SET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
      };
    case SEARCH_CONVERSATIONS:
      return { ...state, searchConversations: action.payload };
    case SET_MESSAGES:
      return { ...state, messages: action.payload };
    case SET_NEW_MESSAGE:
      if (action.payload.newConversation) {
        const isSender =
          action.payload.createdMessage.authorId ===
          localStorage.getItem("userId");
        return {
          ...state,
          // remove user whom we started new conversation with from searched
          searchedUsers: state.searchedUsers
            ? [
                ...state.searchedUsers.filter((user) => {
                  if (isSender)
                    // when messsage starts a new conversation, the id of selectedConversation is id of a user with whom we are starting the conversation
                    return user._id !== state.selectedConversation?.id;
                  else
                    return user._id !== action.payload.createdMessage.authorId;
                }),
              ]
            : null,
          // add just created conversation to our conversations list
          conversations: [
            {
              ...action.payload.newConversation,
              lastMessage: action.payload.createdMessage,
            },
            ...state.conversations,
          ],
          // select the new conversation for sender
          selectedConversation: isSender
            ? {
                ...state.selectedConversation,
                new: false,
                id: action.payload.newConversation._id,
              }
            : state.selectedConversation,
          messages: isSender ? [action.payload.createdMessage] : state.messages,
        };
      }
      if (
        action.payload.createdMessage.conversationId ===
        state.selectedConversation?.id
      ) {
        return {
          ...state,
          conversations: [
            ...state.conversations
              ?.filter(
                (conversation) =>
                  conversation._id === state.selectedConversation?.id
              )
              .map((conversation) => {
                conversation.lastMessage = action.payload.createdMessage;
                return conversation;
              }),
            ...state.conversations?.filter(
              (conversation) =>
                conversation._id !== state.selectedConversation?.id
            ),
          ],
          messages: [...state.messages, action.payload.createdMessage],
        };
      }
    default:
      return state;
  }
}
