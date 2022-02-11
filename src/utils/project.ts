import { useMutation, useQuery, useQueryClient } from "react-query";
import { IProject } from "screens/project-list/list";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<IProject>) => {
  const client = useHttp();

  return useQuery<IProject[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<IProject>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"), // 对列表进行更新 的配置项
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<IProject>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    {
      // Invalidate and refetch
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<IProject>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id, // 就是当id不是undefined的时候才去请求
    }
  );
};
