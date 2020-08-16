import React, { MouseEvent } from "react";
import "./DeleteConversation.scss";

interface IProps {
  conversationId: string;
  deleteConversation(conversationId: string): void;
}

export default function DeleteConversation({
  conversationId,
  deleteConversation,
}: IProps) {
  const handleConversationDelete = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const confirmed = confirm(
      "Are you sure you want to delete the conversation? It will be deleted only for you and not for the other user. This process is irreversible."
    );
    if (confirmed) deleteConversation(conversationId);
  };

  return (
    <div
      onClick={(e) => handleConversationDelete(e)}
      className="conversation-delete"
    >
      <i className="far fa-trash-alt"></i>
    </div>
  );
}
