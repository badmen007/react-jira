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
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{users.find((user) => user.id === project.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
