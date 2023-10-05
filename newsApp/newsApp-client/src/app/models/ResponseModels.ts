import { NewsFeedPost } from "./NewsFeedPost";
import { User } from "./User";

export interface GetUserResponse {
  data:{
      user:User;
  };
  status:string;
}

export interface GetNewsfeedPostResponse {
  status: string;
  data: {
    post: NewsFeedPost;
  };
}
