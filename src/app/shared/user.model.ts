export class User {
  username: string;
  authenticationToken: string;

  constructor(username: string, authenticationToken: string) {
    this.username = username;
    this.authenticationToken = authenticationToken;
  }
}
