import React from "react";
import { RedirectFunction, redirect } from "react-router-dom";

type RedirectLinkProps = React.PropsWithChildren & {
  url: string;
  init?: number | ResponseInit;
};

const RedirectLink: React.FC<RedirectLinkProps> = (props) => {
  const { children, url, init } = props;

  const handleRedirectButtonOnClick = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("redirect url: ", url);
    redirect(url, init);
  };

  return <button onClick={handleRedirectButtonOnClick}>{children}</button>;
};

export default RedirectLink;
