/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
 * The interface represents the component's properties.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly introduction: Array<string>;
  readonly todos: Array<string>;
}

/**
 * @description
 * The component renders an introduction text as well as the user's active todo list.
 *
 * @param {ComponentProps} props
 * @param props.introduction The component's summary text.
 * @param props.todos The todo list array.
 *
 * @returns {JSX.Element}
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
