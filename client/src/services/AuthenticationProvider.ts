import { AppConfig } from "../context";
import { AuthenticatedUser, UserLogin, UserRegister } from "../types";

type RegisterResult = "Resolved" | "Rejected" | "Error";

export const RegisterUser: (
  user: UserRegister
) => Promise<RegisterResult> = async (user: UserRegister) => {
  try {
    const fetchResult = await fetch(
      `${AppConfig.apiRootUrl}${AppConfig.registerPath}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          fullname: user.fullname,
        }),
      }
    );

    const result = await fetchResult.json();
    console.log("result: ", result);

    if (result.code === 201) {
      return "Resolved";
    }

    return "Rejected";
  } catch (error) {
    console.error("Error", error);
    return "Error";
  }
};

type LoginResult = AuthenticatedUser | undefined;

export const LoginUser: (user: UserLogin) => Promise<LoginResult> = async (
  user: UserLogin
) => {
  try {
    const fetchResult = await fetch(
      `${AppConfig.apiRootUrl}${AppConfig.loginPath}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          strategy: "local",
        }),
      }
    );

    const result = await fetchResult.json();
    console.log("result: ", result);

    if (result.accessToken) {
      return {
        ...result.user,
        accessToken: result.accessToken,
      };
    }

    return undefined;
  } catch (error) {
    console.error("Error", error);
    return undefined;
  }
};
