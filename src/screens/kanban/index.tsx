import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParams, useProjectInUrl } from "./util";
import { ScreenContainer } from "components/lib";

export const KanbanScreen = () => {
  useDocumentTitle("看板");

  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: currentProjcet } = useProjectInUrl();

  return (
    <ScreenContainer>
      <h1>{currentProjcet?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  // overflow-x: scroll;
  flex: 1;
`;
