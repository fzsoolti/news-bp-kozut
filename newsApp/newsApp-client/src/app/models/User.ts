export interface User {
  _id: number;
  sub:number;
  username: string;
  email: string;
  pictureURL: string;
  createdAt: Date;
  lastLogin: Date;
}
