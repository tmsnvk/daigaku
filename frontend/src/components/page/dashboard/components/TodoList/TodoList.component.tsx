import { ListContainer } from './TodoList.styles.ts';
import { generalIntroduction } from './TodoList.utilities.ts';

const TodoList = () => {
  return (
    <ListContainer>
      <ul>
        {generalIntroduction.map((paragraph, index) => {
          return <li key={index}>{paragraph}</li>;
        })}
      </ul>
    </ListContainer>
  );
};

export default TodoList;
