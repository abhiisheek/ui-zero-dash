import { getURL } from "@/utils/app";
import { RequestHelper } from "@/utils/http";

export const login = async (email: string, password: string) => {
  const response = await RequestHelper.makeRequest({
    url: getURL("login"),
    method: "POST",
    reqParams: {
      email,
      password,
    },
  });

  return response;
};