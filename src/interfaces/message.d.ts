export interface IMessage {
  _id: string;
  sender: string;
  text: string;
  media_url?: string;
  sent: boolean;
  conversation: string;
  createdAt: Date;
  updatedAt: Date;
}
