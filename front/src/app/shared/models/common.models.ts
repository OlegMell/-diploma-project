export interface Credentials {
  login: string;
  password: string;
}

export interface CreateAccount {
  login: string;
  password: string;
  username: string;
}

export interface Auth {
  token?: string;
}

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface Profile {
  img: string;
  username: string;
}

export interface PersonalData {
  name?: string;
  email?: string;
  photo?: string | File;
  phone?: string;
  bio?: string;
  site?: string;
  username?: string;
}
