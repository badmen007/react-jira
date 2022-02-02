import { Table } from "antd";
import { IUser } from "./search-panel";
import dayjs from "dayjs";
interface IProject {
  id: string;
  name: string;
  personId: string;
  pin: string;
  organization: string;
  created: number;
}
interface IListProps {
  list: IProject[];
  users: IUser[];
}

const List = ({ list, users }: IListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
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
      dataSource={list}
    />
  );
};

export default List;
