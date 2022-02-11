import { useQuery } from "react-query";
import { IKanban } from "types/kanban";
import { useHttp } from "./http";

export const useKanbans = (param?: Partial<IKanban>) => {
  const client = useHttp();

  return useQuery<IKanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
