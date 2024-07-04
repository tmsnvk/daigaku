import { useCreateCurrentTodos } from './TodoList.hooks.tsx';

import { Section } from './TodoList.styles.ts';

import { generalIntroduction } from './TodoList.utilities.ts';

import { DashboardDataT } from '../../Dashboard.hooks.tsx';

type ComponentPropsT = {
  data: DashboardDataT
};

const TodoList = ({ data }: ComponentPropsT) => {
  const { currentTodos } = useCreateCurrentTodos(data);

  return (
    <Section>
      <ul>
        {generalIntroduction.map((paragraph, index) => <li key={index}>{paragraph}</li>)}
      </ul>
      <ol>
        {currentTodos.map((paragraph, index) => <li key={index}>{paragraph}</li>)}
      </ol>
    </Section>
  );
};

export default TodoList;
