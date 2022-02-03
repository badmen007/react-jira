import { useEffect } from "react";
import { IUser } from "screens/project-list/search-panel";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<IUser>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<IUser[]>();
  useEffect(() => {
    //就是只挂载一次
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
