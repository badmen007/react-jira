import { Dropdown, Menu, Table, TableProps } from "antd";
import { IUser } from "./search-panel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "./util";
export interface IProject {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
interface IListProps extends TableProps<IProject> {
  // 加的属性直接透传到Table上
  users: IUser[];
}

const List = ({ users, ...props }: IListProps) => {
  const { mutate } = useEditProject();
  const { startEdit } = useProjectModal();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const editProject = (id: number) => () => startEdit(id);
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            // return <Pin checked={true} onCheckedChange={pin => mutate({id:project.id, pin})}/>
            /* 下面的这种写法等同于上面的这种写法 下面这种写法是柯里化的思想 */
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
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
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      <ButtonNoPadding
                        onClick={editProject(project.id)}
                        type={"link"}
                      >
                        编辑
                      </ButtonNoPadding>
                    </Menu.Item>
                    <Menu.Item>
                      <ButtonNoPadding type={"link"}>删除</ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};

export default List;
