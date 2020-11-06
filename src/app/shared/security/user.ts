import {
  Role
} from './role';

export class User {
  id: number;
  img: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  role: Role;
}

export class LoginResponse {
  LoggedIn: boolean;
  Profile: User;
  Token: string;
  message: string;
};
