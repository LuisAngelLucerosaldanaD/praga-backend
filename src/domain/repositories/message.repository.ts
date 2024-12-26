import { Message } from '../entities/Message.entity';

export interface MessageRepository {
  createMessage(msg: Message): Promise<boolean>;

  updateMessage(msg: Message): Promise<boolean>;

  deleteMessage(id: string): Promise<boolean>;

  getMessageById(id: string): Promise<Message | null>;

  getMessages(): Promise<Message[]>;
}
