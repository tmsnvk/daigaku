import { useCreateCurrentTodos } from './TodoList.hooks.tsx';
import { ListContainer } from './TodoList.styles.ts';
import { generalIntroduction } from './TodoList.utilities.ts';
import { DashboardDataT } from '@pages/Dashboard/Dashboard.hooks.tsx';

type ComponentPropsT = {
  data: DashboardDataT
};

const TodoList = ({ data }: ComponentPropsT) => {
  const { currentTodos } = useCreateCurrentTodos(data);

  return (
    <ListContainer>
      <ul>
        {generalIntroduction.map((paragraph, index) => {
          return <li key={index}>{paragraph}</li>;
        })}
      </ul>
      <ol>
        {currentTodos.map((paragraph, index) => {
          return <li key={index}>{paragraph}</li>;
        })}
      </ol>
    </ListContainer>
  );
};

export default TodoList;
