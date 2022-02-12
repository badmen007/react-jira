import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { IKanban } from "types/kanban";
import { Task } from "types/task";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

export const useKanbans = (param?: Partial<IKanban>) => {
  const client = useHttp();

  return useQuery<IKanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<IKanban>) =>
      client(`kanbans`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};
