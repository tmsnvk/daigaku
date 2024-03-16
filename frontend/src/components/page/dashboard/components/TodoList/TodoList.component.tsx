import { ListContainer } from './TodoList.styles.ts';
import { useCreateCurrentTodos } from './TodoList.hooks.tsx';
import { generalIntroduction } from './TodoList.utilities.ts';
import { DashboardDataT } from '@pages/Dashboard/Dashboard.hooks.tsx';

type ComponentPropsT = {
  data: DashboardDataT
};

const TodoList = ({ data }: ComponentPropsT) => {
  const { createCurrentTodos } = useCreateCurrentTodos(data);

  return (
    <ListContainer>
      <ul>
        {generalIntroduction.map((paragraph, index) => {
          return <li key={index}>{paragraph}</li>;
        })}
      </ul>
      <ol>
        {createCurrentTodos()}
      </ol>
    </ListContainer>
  );
};

export default TodoList;
