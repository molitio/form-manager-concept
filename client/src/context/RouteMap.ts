import { Route, RouteMap } from "../types";

export const routeMap: RouteMap = {
  root: {
    displayText: "Home",
    href: "/",
    requireAuth: false,
    hidden: true,
  },
  login: {
    displayText: "Bejelentkezés",
    href: "/auth",
    requireAuth: false,
  },
  register: {
    displayText: "Regisztráció",
    href: "/register",
    requireAuth: false,
  },
  surveys: {
    displayText: "Kérdőíveim",
    href: "/surveys",
    requireAuth: true,
  },

  responses: {
    displayText: "Válaszok",
    href: "/responses",
    requireAuth: true,
  },

  profiles: {
    displayText: "Profil",
    href: "/profile",
    requireAuth: true,
  },

  logOut: {
    displayText: "Kijelentkezés",
    href: "/",
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
