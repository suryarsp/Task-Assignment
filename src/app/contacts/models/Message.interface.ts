import { MessageType } from './MessageType.enum';

export interface Message {
  messageId: string;
  messageType: MessageType;
  message: string;
  conactedPerson: {
    contactId: string;
    contactName: string;
  };
}

