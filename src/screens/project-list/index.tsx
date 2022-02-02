import { useState, useEffect } from "react";
import qs from "qs";
import { cleanObject, useDebounce, useMount } from "utils";
import { SearchPanel } from "./search-panel";
import List from "./list";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

//js本身是弱类型的语言 很多的错误实在 runtime 的时候发现的  但是我们希望在写代码的时候就能发现错误 这就要用到ts
//ts是强类型的js, 换句话说就是给js增加其它强类型语言那样的类型约束 但是最终ts会被编译成es5

const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });

  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedValue = useDebounce(param, 1000);
  const client = useHttp();

  useMount(() => {
    client("users").then(setUsers);
  });

  useEffect(() => {
    //就是只挂载一次
    client("projects", { data: cleanObject(debouncedValue) }).then(setList);
  }, [debouncedValue]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
