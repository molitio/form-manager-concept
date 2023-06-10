import React from "react";
import { StyledAppShell, StyledGlobal } from "../styled";
import { AppContextStoreProvider } from "../context";
import { NavigationHeader } from "../components";

const Layout: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <AppContextStoreProvider>
      <NavigationHeader />
      <StyledAppShell>{children}</StyledAppShell>
      <StyledGlobal />
    </AppContextStoreProvider>
  );
};

export default Layout;
