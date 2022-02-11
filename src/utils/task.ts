import { useQuery } from "react-query";
import { ITask } from "types/task";
import { useHttp } from "./http";

export const useTasks = (param?: Partial<ITask>) => {
  const client = useHttp();

  return useQuery<ITask[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
