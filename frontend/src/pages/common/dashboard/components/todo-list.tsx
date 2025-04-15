/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { Todo } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface TodoListProps {
  /**
   * The component's main text.
   */
  readonly introduction: Array<string>;

  /**
   * The todo list.
   */
  readonly todos: Array<Todo>;
}

/**
 * Renders introduction text paragraphs as well as the user's current todo list.
 *
 * @param {TodoListProps} props
 * @return {JSX.Element}
 */
export const TodoList = ({ introduction, todos }: TodoListProps): JSX.Element => {
  return (
    <section className={'core-primary-border bg-accent mx-auto mb-20 w-[95%] px-12 py-4 text-xl lg:w-[65%]'}>
      <ul>
        {introduction.map((paragraph: string, index: number) => (
          <li
            key={index}
            className={index === 0 ? 'mb-4 mt-8' : index === introduction.length - 1 ? 'mt-8' : 'mb-4'}
          >
            {paragraph}
          </li>
        ))}
      </ul>
      <ol className={'ml-20'}>
        {todos.map((todo: Todo, index: number) => (
          <li
            key={index}
            className={joinTw('list-[square]', index === 0 ? 'mb-4 mt-8' : index === todos.length - 1 ? 'mb-8' : 'mb-4')}
          >
            {todo}
          </li>
        ))}
      </ol>
    </section>
  );
};
