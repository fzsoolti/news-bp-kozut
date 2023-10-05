import { User } from "./User";

export interface NewsFeedPost {
  _id: string;
  title: string;
  image: string;
  content: string;
  createdAt: Date;
  lastModified: Date;
  createdBy: User;
}
