import React from "react";
import {
  StyledRegister,
  StyledRegisterForm,
  StyledRegisterFormButton,
  StyledRegisterFormInput,
  StyledRegisterFormLabel,
} from "../styled";

const Register: React.FC = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    // Perform form validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Perform registration logic
    // Call API, dispatch actions, etc.

    // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <StyledRegister>
      <StyledRegisterForm onSubmit={handleRegister}>
        <StyledRegisterFormLabel htmlFor="name">Név:</StyledRegisterFormLabel>
        <StyledRegisterFormInput
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <StyledRegisterFormLabel htmlFor="email">
          Email:
        </StyledRegisterFormLabel>
        <StyledRegisterFormInput
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <StyledRegisterFormLabel htmlFor="password">
          Jelszó:
        </StyledRegisterFormLabel>
        <StyledRegisterFormInput
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <StyledRegisterFormLabel htmlFor="confirm-password">
          Jelszó megerősítése:
        </StyledRegisterFormLabel>
        <StyledRegisterFormInput
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
