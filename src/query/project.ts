import { useQuery, useMutation, useQueries } from "@tanstack/react-query";

import {
  createProject,
  getProjects,
  getProject,
  getVisuals,
  createViz,
  updateViz,
  getViz,
  getDashboards,
  createDashboard,
  getDashboard,
  updateDashboard,
  publishDashboard,
} from "@/apis/project";

export const useCreateProject = () => useMutation({ mutationFn: createProject });

export const useProjects = () => useQuery({ queryKey: ["projects"], queryFn: getProjects });

export const useProject = () => useMutation({ mutationFn: getProject });

export const useVisuals = () => useMutation({ mutationFn: getVisuals });

export const useCreateVisual = () => useMutation({ mutationFn: createViz });

export const useUpdateVisual = () => useMutation({ mutationFn: updateViz });

export const useGetVisual = () => useMutation({ mutationFn: getViz });

export const useDashboards = () => useMutation({ mutationFn: getDashboards });

export const useCreateDashboard = () => useMutation({ mutationFn: createDashboard });

export const useDashboard = () => useMutation({ mutationFn: getDashboard });

export const useUpdateDashboard = () => useMutation({ mutationFn: updateDashboard });

export const usePublishDashboard = () => useMutation({ mutationFn: publishDashboard });

export const useDashboardVisuals = (projectId: any, vizIds: any[], combineFunc: any) => {
  const queriesList: any = vizIds.map(({ vizId }) => ({
    queryKey: ["dashboardVisuals", { vizId, projectId }],
    queryFn: ({ queryKey }: any) => getViz(queryKey[1]),
  }));

  return useQueries({ queries: queriesList, combine: combineFunc });
};
