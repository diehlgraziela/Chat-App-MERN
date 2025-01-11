export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string | null;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}
