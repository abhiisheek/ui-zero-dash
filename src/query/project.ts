import { useQuery, useMutation } from "@tanstack/react-query";

import { createProject, getProjects, getProject } from "@/apis/project";

export const useCreateProject = () => useMutation({ mutationFn: createProject });

export const useProjects = () => useQuery({ queryKey: ["projects"], queryFn: getProjects });

export const useProject = () => useMutation({ mutationFn: getProject });
