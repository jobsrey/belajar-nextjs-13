export interface IFormLogin {
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  email: string;
  id?: string;
  token?: string;
}
