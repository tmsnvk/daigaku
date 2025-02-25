/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

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
    <section className={'base-light-border w-[95%] lg:w-[65%] mb-[5rem] mx-auto px-[3.5rem] py-[1rem] text-xl bg-(--color-indian-yellow)'}>
      <ul>
        {introduction.map((paragraph: string, index: number) => (
          <li
            key={index}
            className={index === 0 ? 'mt-[2rem] mb-[1.5rem]' : index === introduction.length - 1 ? 'mb-[2rem]' : 'mb-[1.5rem]'}
          >
            {paragraph}
          </li>
        ))}
      </ul>
      <ol className={'ml-[2.5rem]'}>
        {todos.map((todo: Todo, index: number) => (
          <li
            key={index}
            className={`list-[square] ${index === 0 ? 'mt-[2rem] mb-[1.5rem]' : index === todos.length - 1 ? 'mb-[2rem]' : 'mb-[1.5rem]'}`}
          >
            {todo}
          </li>
        ))}
      </ol>
    </section>
  );
};
