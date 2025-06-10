/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type imports */
import { Todo } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface TodoListProps {
  /**
   * The component's main text.
   */
  readonly introduction: string;

  /**
   *
   */
  readonly currentTodoItemsTitle: string;

  /**
   * The todo list.
   */
  readonly currentTodoItems: Array<Todo>;
}

/**
 * Renders introduction text paragraphs as well as the user's current todo list.
 *
 * @param {TodoListProps} props
 * @return {JSX.Element}
 */
export const TodoList = ({ introduction, currentTodoItemsTitle, currentTodoItems }: TodoListProps): JSX.Element => {
  return (
    <section
      className={joinTw(
        'core-primary-border',
        'w-[95%] lg:w-[65%]',
        'mx-auto mb-20 px-12 py-4',
        'bg-accent',
        'text-xl',
      )}
    >
      <p className={'mb-4 mt-8'}>{introduction}</p>
      <p className={'mb-4'}>{currentTodoItemsTitle}</p>
      <ol className={'ml-20'}>
        {currentTodoItems.map((item: Todo, index: number) => (
          <li
            key={index}
            className={joinTw(
              'list-[square]',
              index === 0 ? 'mb-4 mt-8' : index === currentTodoItems.length - 1 ? 'mb-8' : 'mb-4',
            )}
          >
            {item}
          </li>
        ))}
      </ol>
    </section>
  );
};
