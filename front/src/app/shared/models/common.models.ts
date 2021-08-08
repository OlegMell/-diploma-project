
export interface Credentials {
  login: string;
  password: string;
}

export interface CreateAccount {
  login: string;
  password: string;
  username: string;
  phone: string;
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
  firstName?: string;
  email?: string;
  photo?: string | File;
  phone?: string;
  bio?: string;
  site?: string;
  username?: string;
}

export interface FoundUser {
  _id: string;
  username: string;
  email: string;
  photo: string;
  firstName: string;
  personalInfo: any;
}

export interface FoundUsers {
  foundUsers: FoundUser[];
}

export interface Post {
  author: string;
  text?: string;
  date: number;
  images?: File[] | string[];
  voice?: File | string;
}

export interface FullPost {
  _id: string;
  date: number;
  text?: string;
  isLiked?: boolean;
  author: string;
  voice?: string;
  images?: string[];
  likes: number;
  views: number;
  comments: string[];
}

export interface PostWithAuthorData {
  post: FullPost;
  authorData: FoundUser;
}

export interface TokenResult {
  readonly id: string;
  readonly exp: number;
  readonly iat: number;
  readonly sub: string;
}
