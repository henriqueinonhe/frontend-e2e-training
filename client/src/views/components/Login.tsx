import styled from "styled-components";
import { TextInput } from "./TextInput";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/infra/api/login";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: loginMutation, status } = useMutation({
    mutationFn: () => login(email, password),
  });
  const queryClient = useQueryClient();

  const handleLoginButtonClicked = async () => {
    const token = await loginMutation();

    localStorage.setItem("token", token);

    queryClient.invalidateQueries({
      queryKey: ["IsLoggedIn"],
    });
  };

  return (
    <Login.Container>
      <TextInput
        label="Email"
        value={email}
        onChange={(value) => setEmail(value)}
      />

      <TextInput
        label="Password"
        value={password}
        onChange={(value) => setPassword(value)}
      />

      <Login.Button onClick={handleLoginButtonClicked}>
        {status === "pending" ? "Loading..." : "Login"}
      </Login.Button>

      <Login.Notice>{status === "error" ? "Login failed!" : ""}</Login.Notice>
    </Login.Container>
  );
};

Login.Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

Login.Button = styled(Button)`
  margin-top: 20px;
`;

Login.Notice = styled.div`
  margin-top: 20px;
  color: red;
`;
