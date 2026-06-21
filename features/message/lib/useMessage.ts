'use client'

import { messageStore, MessageType,  } from "../model";

export function useMessage() {
  const message = messageStore((state) => state.message);
  const content = messageStore((state) => state.content);

  const addNewMessage = (newMessage: MessageType) => {
    message.setMessage(newMessage);
  };

  const { clearMessage } = message

  return {
    clearMessage,
    addNewMessage,
    content
  };
}