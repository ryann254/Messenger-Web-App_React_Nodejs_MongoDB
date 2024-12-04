export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  online: boolean;
  imageUrl?: string;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}
