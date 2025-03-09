import { useQuery, useMutation } from "@tanstack/react-query";

import { createProject, getProjects } from "@/apis/project";

export const useCreateProject = () => useMutation({ mutationFn: createProject });

export const useProjects = () => useQuery({ queryKey: ["projects"], queryFn: getProjects });
