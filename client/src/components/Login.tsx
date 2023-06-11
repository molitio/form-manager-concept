import React from "react";
import { RootState, setLoggedIn } from "../context";
import { useSelector, useDispatch } from "react-redux";

const Login: React.FC = () => {
  const loggedIn = useSelector((state: RootState) => state.app?.auth?.loggedIn);
  const dispatch = useDispatch();

  const handleMockLogin = () => {
    dispatch(setLoggedIn(true));
    console.log("logged in state", loggedIn);
  };
  const handleMockLogout = () => {
    dispatch(setLoggedIn(false));
    console.log("logged in state", loggedIn);
  };
  return (
    <>
      login
      <button onClick={handleMockLogin}>login mock</button>
      <button onClick={handleMockLogout}>logout mock</button>
    </>
  );
};

export default Login;
