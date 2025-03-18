import { getURL } from "@/utils/app";
import { RequestHelper } from "@/utils/http";

export const createProject = async (details: any) => {
  const response = await RequestHelper.makeRequest({
    url: `${getURL("project")}/create`,
    method: "POST",
    reqParams: details,
  });

  return response;
};

export const getProjects = async () => {
  const response = await RequestHelper.makeRequest({
    url: `${getURL("project")}/all`,
    method: "GET",
  });

  return response;
};

export const getVisuals = async (projectId: string) => {
  const response = await RequestHelper.makeRequest({
    url: `${getURL("project")}/${projectId}/viz/all`,
    method: "GET",
  });

  return response;
};

export const getProject = async (id: string) => {
  const response = await RequestHelper.makeRequest({
    url: `${getURL("project")}/${id}`,
    method: "GET",
  });

  return response;
};
