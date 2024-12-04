export interface IConversation {
  _id: string;
  name: string;
  tag: string;
  description: string;
  members: IUser[];
  messages: IMessage[];
}
