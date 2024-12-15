/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* component, style imports */
import { Section } from './todos-view.styles';

/* interface, type, enum imports */
import { Todo } from '../../layouts/student-layout/student-layout.hooks';

/**
 * ===============
 * Component {@link TodosView}
 * ===============
 */

/**
 * Defines the component's properties.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * The component's summary text.
   */
  readonly introduction: Array<string>;

  /**
   * The todo list array.
   */
  readonly todos: Array<string>;
}

/**
 * Renders an introduction text as well as the user's active todo list.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
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
