import { User } from "./User";

export interface GetUserResponse {
  data:{
      user:User;
  };
  status:string;
}
