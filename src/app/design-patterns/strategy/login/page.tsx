"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { LoginContext } from "./context-class";
import { EmailLogin, GoogleLogin, KakaoLogin } from "./login-strategy";

enum LoginOptions {
  EMAIL = "Email",
  GOOGLE = "Google",
  KAKAO = "Kakao",
}

const LOGIN_STRATEGIES = {
  [LoginOptions.EMAIL]: new EmailLogin(),
  [LoginOptions.GOOGLE]: new GoogleLogin(),
  [LoginOptions.KAKAO]: new KakaoLogin(),
} as const;

const LOGIN_CONTEXT = new LoginContext(LOGIN_STRATEGIES[LoginOptions.EMAIL]);

export default function LoginPage() {
  const [selectedOption, setSelectedOption] = useState<LoginOptions>(
    LoginOptions.EMAIL
  );
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const handleLogin = useCallback(() => {
    const loginStrategy = LOGIN_STRATEGIES[selectedOption];
    LOGIN_CONTEXT.setLoginStrategy(loginStrategy);
    setResult(LOGIN_CONTEXT.login(login, password));
  }, [selectedOption, login, password]);

  return (
    <div className="flex flex-col gap-2 max-w-md">
      <RadioGroup
        value={selectedOption}
        onValueChange={(value) => setSelectedOption(value as LoginOptions)}
      >
        {Object.entries(LoginOptions).map(([key, value]) => (
          <div className="flex gap-2" key={key}>
            <RadioGroupItem value={value} id={`option-${key}`} />
            <Label htmlFor={`option-${key}`}>{value}</Label>
          </div>
        ))}
      </RadioGroup>
      <Input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
      {result && <p>{result}</p>}
    </div>
  );
}
