export interface ITask {
  id: number;
  name: string;
  // 经办人
  processorId: number;
  projectId: number;
  // 任务组
  epicId: number;
  kanbanId: number;
  //bug
  typeId: number;
  note: string;
}
