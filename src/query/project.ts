import { useQuery, useMutation } from "@tanstack/react-query";

import {
  createProject,
  getProjects,
  getProject,
  getVisuals,
  createViz,
  updateViz,
  getViz,
  getDashboards,
} from "@/apis/project";

export const useCreateProject = () => useMutation({ mutationFn: createProject });

export const useProjects = () => useQuery({ queryKey: ["projects"], queryFn: getProjects });

export const useProject = () => useMutation({ mutationFn: getProject });

export const useVisuals = () => useMutation({ mutationFn: getVisuals });

export const useCreateVisual = () => useMutation({ mutationFn: createViz });

export const useUpdateVisual = () => useMutation({ mutationFn: updateViz });

export const useGetVisual = () => useMutation({ mutationFn: getViz });

export const useDashboards = () => useMutation({ mutationFn: getDashboards });
