export interface Login {
  login(username: string, password: string): string;
}

export class EmailLogin implements Login {
  login(username: string, password: string) {
    if (password.length < 6) return "Login failed";
    return `Logged in with email: ${username}`;
  }
}

export class GoogleLogin implements Login {
  login(username: string, password: string) {
    if (password.length < 6) return "Login failed";
    return `Logged in with Google account: ${username}`;
  }
}

export class KakaoLogin implements Login {
  login(username: string, password: string) {
    if (password.length < 6) return "Login failed";
    return `Logged in with Kakao account: ${username}`;
  }
}
