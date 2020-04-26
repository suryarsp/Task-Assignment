import { MessageType } from './MessageType.enum';

export interface Message {
  messageType: MessageType;
  message: string;
  date: Date | string;
  from ?: {
    id: string;
    name: string;
  };
  to ?: {
    id: string;
    name: string;
  };
}

