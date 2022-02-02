import { Table } from "antd";
import { IUser } from "./search-panel";

interface IProject {
  id: string;
  name: string;
  personId: string;
  pin: string;
  organization: string;
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
      ]}
      dataSource={list}
    />
  );
};

export default List;
