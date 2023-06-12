import { AppConfig } from "../context";
import { User } from "../types";

export const RegisterUser = async (user: User) => {
  console.log("user: ", user);

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
  return result;
};
