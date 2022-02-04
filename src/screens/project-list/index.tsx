import { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils";
import { SearchPanel } from "./search-panel";
import List from "./list";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";

//js本身是弱类型的语言 很多的错误实在 runtime 的时候发现的  但是我们希望在写代码的时候就能发现错误 这就要用到ts
//ts是强类型的js, 换句话说就是给js增加其它强类型语言那样的类型约束 但是最终ts会被编译成es5

const ProjectListScreen = () => {
  // const [keys] = useState<('name'|'personId')[]>(['name', 'personId']) // 居然还能这么写
  //基本类型可以放到依赖中 组件的状态可以放到依赖中 非组件状态的对象 包括数组和对象 不能放到依赖中
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  const debouncedValue = useDebounce(param, 200);

  const { isLoading, error, data: list } = useProjects(debouncedValue);

  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  //无限渲染问题 怎么去解决 why-did-you-render
  console.log(useUrlQueryParam(["name"]));

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;
const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
