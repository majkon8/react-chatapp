import {
  SET_SEARCHED_USERS,
  SEARCH_CONVERSATIONS,
  SET_SELECTED_CONVERSATION,
  SET_CONVERSATIONS,
  SET_MESSAGES,
  SET_NEW_MESSAGE,
  DISPLAY_MESSAGE,
  DataActionTypes,
} from "../types";
import { IUser } from "./userReducer";

export interface IMessage {
  _id: string;
  body: string;
  type: string;
  file: string;
  authorId: string;
  conversationId: string;
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
  isDisplayed: boolean;
  user: IUser;
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
          // first if user search for himself
          // in localStorage there is saved id of a logged in user

          return state.conversations?.every(
            (conversation) => conversation.user._id !== user._id
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
      // first handle new message which starts new conversation
      if (action.payload.newConversation) {
        const isSender =
          action.payload.createdMessage.authorId ===
          localStorage.getItem("userId");
        return {
          ...state,
          // remove from searched the user whom we started new conversation with
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
          // select the new conversation if the user is sender
          selectedConversation: isSender
            ? {
                ...state.selectedConversation,
                new: false,
                id: action.payload.newConversation._id,
              }
            : //else don't do anything
              state.selectedConversation,
          // if the user is sender, then we want to show created message on his chat
          messages: isSender ? [action.payload.createdMessage] : state.messages,
        };
      }
      // now handle new message when it doesn't start new conversation
      return {
        ...state,
        conversations: [
          // conversation from which we received message must go on top of all conversations
          ...state.conversations
            // first filter gives us the conversation
            ?.filter(
              (conversation) =>
                conversation._id ===
                action.payload.createdMessage.conversationId
            )
            // then we are updating the lastMessage to be the received one
            .map((conversation) => {
              conversation.lastMessage = action.payload.createdMessage;
              conversation.isDisplayed = false;
              return conversation;
            }),
          // then we are setting others conversations
          ...state.conversations?.filter(
            (conversation) =>
              conversation._id !== action.payload.createdMessage.conversationId
          ),
        ],
        // if the selected conversation is the one from which we get the message, then add this message to the chat, else do nothing
        messages:
          action.payload.createdMessage.conversationId ===
          state.selectedConversation?.id
            ? [...state.messages, action.payload.createdMessage]
            : state.messages,
      };
    case DISPLAY_MESSAGE:
      return {
        ...state,
        conversations: [
          ...state.conversations?.map((conversation) => {
            if (conversation._id === action.payload._id)
              conversation.isDisplayed = true;
            return conversation;
          }),
        ],
      };
    default:
      return state;
  }
}
