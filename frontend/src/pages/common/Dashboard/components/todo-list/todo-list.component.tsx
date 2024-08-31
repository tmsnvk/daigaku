/**
 * @prettier
 */

/* logic imports */
import { CreateCurrentTodos, useCreateCurrentTodos } from './todo-list.hooks';

/* component, style imports */
import { Section } from './todo-list.styles';

/* utilities imports */
import { generalIntroduction } from './todo-list.utilities';

/* interface, type, enum imports */
import { DashboardData } from '../../ddashboard.hooks';

/* interfaces, types, enums */
interface ComponentProps {
  readonly data: DashboardData;
}

/*
 * component - TODO - add functionality description
 */
export const TodoList = ({ data }: ComponentProps) => {
  const { currentTodos }: CreateCurrentTodos = useCreateCurrentTodos(data);

  return (
    <Section>
      <ul>
        {generalIntroduction.map((paragraph, index) => (
          <li key={index}>{paragraph}</li>
        ))}
      </ul>
      <ol>
        {currentTodos.map((paragraph, index) => (
          <li key={index}>{paragraph}</li>
        ))}
      </ol>
    </Section>
  );
};
