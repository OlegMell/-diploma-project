
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
  token: string;
}
