import { Table, TableProps } from "antd";
import { IUser } from "./search-panel";
import dayjs from "dayjs";
export interface IProject {
  id: string;
  name: string;
  personId: string;
  pin: string;
  organization: string;
  created: number;
}
interface IListProps extends TableProps<IProject> {
  // 加的属性直接透传到Table上
  users: IUser[];
}

const List = ({ users, ...props }: IListProps) => {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
          key: "organization",
        },
        {
          title: "负责人",
          key: "id",
          render(value, project) {
            return (
              <span>
                {users.find((user: IUser) => user.id === project.personId)
                  ?.name || ""}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          key: "created",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};

export default List;
