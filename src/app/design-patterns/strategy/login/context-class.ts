import { Login } from "./login-strategy";

export class LoginContext {
  private loginStrategy: Login;

  constructor(loginStrategy: Login) {
    this.loginStrategy = loginStrategy;
  }

  public setLoginStrategy(loginStrategy: Login) {
    this.loginStrategy = loginStrategy;
  }

  public login(username: string, password: string) {
    return this.loginStrategy.login(username, password);
  }
}
