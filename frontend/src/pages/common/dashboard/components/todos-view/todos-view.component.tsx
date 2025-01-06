/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { Section } from './todos-view.styles';

/* interface, type, enum imports */
import { Todo } from '@common-types';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The component's main text.
   */
  readonly introduction: Array<string>;

  /**
   * The todo list.
   */
  readonly todos: Array<string>;
}

/**
 * Renders an introduction text as well as the user's current todo list.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const TodosView = ({ introduction, todos }: ComponentProps): JSX.Element => {
  return (
    <Section>
      <ul>
        {introduction.map((paragraph: string, index: number) => (
          <li key={index}>{paragraph}</li>
        ))}
      </ul>
      <ol>
        {todos.map((todo: Todo, index: number) => (
          <li key={index}>{todo}</li>
        ))}
      </ol>
    </Section>
  );
};
