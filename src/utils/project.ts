import { useQuery } from "react-query";
import { IProject } from "screens/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<IProject>) => {
  const client = useHttp();

  return useQuery<IProject[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = () => {
  const { run, ...result } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<IProject>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...result,
  };
};

export const useAddProject = () => {
  const { run, ...result } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<IProject>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...result,
  };
};
