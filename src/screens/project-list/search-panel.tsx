import { Form, Input, Select } from "antd";
import { UserSelect } from "components/use-select";
import { IProject } from "./list";

export interface IUser {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface ISearchPanelProps {
  users: IUser[];
  param: Partial<Pick<IProject, "name" | "personId">>;
  setParam: (param: ISearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: ISearchPanelProps) => {
  return (
    <Form layout={"inline"} style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
