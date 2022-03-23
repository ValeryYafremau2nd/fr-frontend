import IUser from './user/user-interface';

interface IResponseAuth {
  token: string;
  expiresIn: number;
  data: {
    error: string;
    user: IUser;
  };
  error: string;
}
export default IResponseAuth;
