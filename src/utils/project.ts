import { useEffect } from "react";
import { IProject } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<IProject>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<IProject[]>();
  useEffect(() => {
    //就是只挂载一次
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
