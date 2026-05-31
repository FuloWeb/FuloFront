type MessageType = {
  text: string
}

interface IMessageStore {
  getMessage(): string | undefined;
  clearMessage(): void;
  setMessage(message: MessageType): void;
};

type MessageState = {
  content: MessageType | null;
  loading: boolean
};

type MessageStoreType = MessageState & {
  message: IMessageStore
};

export type {
  MessageType,
  IMessageStore,
  MessageState,
  MessageStoreType,
}