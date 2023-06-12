import React from "react";
import {
  StyledRegister,
  StyledRegisterForm,
  StyledRegisterFormButton,
  StyledRegisterFormInput,
  StyledRegisterFormLabel,
} from "../styled";
import { RegisterUser } from "../services";

const Register: React.FC = () => {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const registrationResult = RegisterUser(
        user.name,
        user.email,
        user.password
      );
      console.log("registration result", registrationResult);
    } catch (error) {}
  };

  return (
    <StyledRegister>
      <StyledRegisterForm onSubmit={handleRegister}>
        <StyledRegisterFormLabel htmlFor="name">Név:</StyledRegisterFormLabel>
        <StyledRegisterFormInput
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
          required
        />
        <StyledRegisterFormLabel htmlFor="email">
          Email:
        </StyledRegisterFormLabel>
        <StyledRegisterFormInput
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
          required
        />
        <StyledRegisterFormLabel htmlFor="password">
          Jelszó:
        </StyledRegisterFormLabel>
        <StyledRegisterFormInput
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
          required
        />
        <StyledRegisterFormLabel htmlFor="confirm-password">
          Jelszó megerősítése:
        </StyledRegisterFormLabel>
        <StyledRegisterFormInput
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({
              ...user,
              confirmPassword: e.target.value,
            })
          }
          required
        />
        <StyledRegisterFormButton type="submit">
          Regisztráció
        </StyledRegisterFormButton>
      </StyledRegisterForm>
    </StyledRegister>
  );
};

export default Register;
