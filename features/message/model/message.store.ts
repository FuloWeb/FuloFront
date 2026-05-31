import { IMessageStore, MessageType, MessageState, MessageStoreType } from "./message.types";
import { create } from "zustand";

class MessageStore implements IMessageStore {
  private set: (
    partial:
      | Partial<MessageState>
      | ((state: MessageState) => Partial<MessageState>)
  ) => void;

  private get: () => MessageState;

  constructor(set: MessageStore["set"], get: MessageStore["get"]) {
    this.set = set;
    this.get = get;
  }

  clearMessage = (): void => {
    this.set({
      content: {
        text: "",
      },
      loading: false,
    });
  };

  setMessage = (message: MessageType): void => {
    this.set({
      content: message,
      loading: false,
    });
  };

  getMessage = (): string | undefined => {
    return this.get().content?.text;
  };
}

export const messageStore = create<MessageStoreType>((set, get) => ({
  loading: true,
  content: null,
  message: new MessageStore(
    set,
    () => ({
      content: get().content,
      loading: get().loading,
    })
  )
}));