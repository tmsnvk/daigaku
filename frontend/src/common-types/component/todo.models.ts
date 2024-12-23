/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines a single Todo item.
 */
export type Todo = string;

/**
 * Defines the {@link useTodoList} custom hook's return value properties.
 */
export interface TodoList {
  /**
   * The list of active todo items.
   */
  todos: Array<Todo>;
}
