export const hideElement = (locationPathname: string, noElementRouteMap: any) => {
  if (!locationPathname || !Array.isArray(noElementRouteMap)) {
    return false;
  }

  const firstRouteElement = `/${locationPathname.split("/")[1]}`;

  return noElementRouteMap.includes(firstRouteElement);
};

const URLS: any = {
  login: "http://localhost:4000/user/login",
  project: "http://localhost:4000/project",
  db: "http://localhost:4000/db",
};

export const getURL = (key: string) => {
  return URLS[key];
};
