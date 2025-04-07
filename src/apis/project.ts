import { ObjectType } from "@/types";
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

export const createViz = async ({ projectId, ...payload }: ObjectType) => {
  const response = await RequestHelper.makeRequest({
    url: `${getURL("project")}/${projectId}/viz/create`,
    method: "POST",
    reqParams: payload,
  });

  return response;
};

export const updateViz = async ({ projectId, vizId, ...payload }: ObjectType) => {
  const response = await RequestHelper.makeRequest({
    url: `${getURL("project")}/${projectId}/viz/${vizId}`,
    method: "PUT",
    reqParams: payload,
  });

  return response;
};

export const getViz = async ({ projectId, vizId }: ObjectType) => {
  const response = await RequestHelper.makeRequest({
    url: `${getURL("project")}/${projectId}/viz/${vizId}`,
    method: "GET",
  });

  return response;
};
