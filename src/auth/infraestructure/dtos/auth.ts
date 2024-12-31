export interface ICredentials {
  username: string;
  password: string;
}

export interface ISession {
  access_token: string;
  refresh_token: string;
}

export interface IToken {
  id: string;
  role: string;
  iat: string;
  exp: string;
  iss: string;
}
