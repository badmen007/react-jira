import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板");

  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: currentProjcet } = useProjectInUrl();

  return (
    <div>
      <h1>{currentProjcet?.name}看板</h1>
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </div>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  margin-right: 3rem;
  overflow: hidden;
`;
