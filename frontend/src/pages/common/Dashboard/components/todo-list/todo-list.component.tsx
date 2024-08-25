/**
 * @prettier
 */

import { CreateCurrentTodos, useCreateCurrentTodos } from './todo-list.hooks';

import { Section } from './todo-list.styles';

import { generalIntroduction } from './todo-list.utilities';

import { DashboardData } from '../../dashboard.hooks';

interface ComponentProps {
  readonly data: DashboardData;
}

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
