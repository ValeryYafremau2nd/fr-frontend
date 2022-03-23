import IUser from "./user/user-interface";
  interface IAuth {
    token: string;
    exp: number;
    usr: IUser;
    error: string;
  }
  export default IAuth;
  