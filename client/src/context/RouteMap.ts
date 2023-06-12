import { Route, RouteMap } from "../types";
import { AppConfig } from "./AppConfig";

export const routeMap: RouteMap = {
  root: {
    displayText: "Home",
    href: AppConfig.home,
    requireAuth: false,
    hidden: true,
  },
  login: {
    displayText: "Bejelentkezés",
    href: AppConfig.loginPath,
    requireAuth: false,
  },
  register: {
    displayText: "Regisztráció",
    href: AppConfig.registerPath,
    requireAuth: false,
  },
  surveys: {
    displayText: "Kérdőíveim",
    href: AppConfig.surveysPath,
    requireAuth: true,
  },

  responses: {
    displayText: "Válaszok",
    href: AppConfig.responsesPath,
    requireAuth: true,
  },

  profiles: {
    displayText: "Profil",
    href: AppConfig.profilePath,
    requireAuth: true,
  },

  logOut: {
    displayText: "Kijelentkezés",
    href: AppConfig.logoutPath,
    requireAuth: true,
  },
};

export const displayRoute = (route: Route, loggedIn: boolean) => {
  if (route.hidden) {
    return false;
  } else if (!loggedIn && route.requireAuth) {
    return false;
  } else if (loggedIn && route.requireAuth) {
    return true;
  } else if (!route.requireAuth && loggedIn) {
    return false;
  } else if (!route.requireAuth) {
    return true;
  }
};
