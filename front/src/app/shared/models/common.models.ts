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
  firstname?: string;
  lastname?: string;
  email?: string;
  photo?: string;
  phone?: string;
  bio?: string;
  site?: string;
  username?: string;
}
