export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  profilePic: string;
  createdAt: string;
}

export interface ISignUpData {
  fullName: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}
