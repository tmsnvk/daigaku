/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type imports */
import { Todo } from '../types.ts';

/**
 * Defines the component's properties.
 */
interface TodoListProps {
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
export const TodoList = ({ currentTodoItems }: TodoListProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section className={joinTw('core-primary-border bg-accent mx-auto mb-20 w-[95%] px-12 py-4 text-xl', 'lg:w-[65%]')}>
      <p className={'mb-4 mt-8'}>{t('app.page.dashboard.todo.instructions')}</p>
      <p className={'mb-4'}>{t('app.page.dashboard.todo.currentItems')}</p>
      <ol className={'ml-20'}>
        {currentTodoItems.map((item: Todo, index: number) => (
          <li
            className={joinTw(
              'list-[square]',
              index === 0 ? 'mb-4 mt-8' : index === currentTodoItems.length - 1 ? 'mb-8' : 'mb-4',
            )}
            key={index}
          >
            {item}
          </li>
        ))}
      </ol>
    </section>
  );
};
