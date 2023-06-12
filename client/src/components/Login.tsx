import React from "react";
import { AppConfig, RootState, setLoggedIn, setUser } from "../context";
import { useSelector, useDispatch } from "react-redux";
import {
  StyledErrorText,
  StyledForm,
  StyledFormButton,
  StyledFormInput,
  StyledFormLabel,
  StyledLogin,
} from "../styled";
import { UserLogin } from "../types";
import { LoginUser } from "../services";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedIn = useSelector(
    (state: RootState) => state.auth?.user?.loggedIn
  );

  if (loggedIn) {
    navigate(`${AppConfig.apiRootUrl}${AppConfig.surveysPath}`);
  }

  const [authenticatedUser, setAuthenticatedUser] = React.useState<UserLogin>({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = React.useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("login");
    try {
      const Login = async () => {
        const loginResult = await LoginUser(authenticatedUser);
        if (!loginResult) {
          setLoginError("Probléma merült fel a belépéssel");
        } else {
          dispatch(setLoggedIn(true));
          dispatch(
            setUser({
              ...loginResult,
            })
          );
          setLoginError("");
          navigate(`${AppConfig.apiRootUrl}${AppConfig.surveysPath}`);
        }
      };

      Login();
    } catch (error) {}
  };

  return (
    <StyledLogin>
      <StyledErrorText>
        {loginError.length > 0 ? loginError : ""}
      </StyledErrorText>
      <StyledForm onSubmit={handleLogin}>
        <StyledFormLabel htmlFor="email">Email:</StyledFormLabel>
        <StyledFormInput
          type="email"
          id="email"
          name="email"
          value={authenticatedUser.email}
          onChange={(e) =>
            setAuthenticatedUser({
              ...authenticatedUser,
              email: e.target.value,
            })
          }
          required
        />
        <StyledFormLabel htmlFor="password">Jelszó:</StyledFormLabel>
        <StyledFormInput
          type="password"
          id="password"
          name="password"
          value={authenticatedUser.password}
          onChange={(e) =>
            setAuthenticatedUser({
              ...authenticatedUser,
              password: e.target.value,
            })
          }
          required
        />

        <StyledFormButton type="submit">Login</StyledFormButton>
      </StyledForm>
    </StyledLogin>
  );
};

export default Login;
