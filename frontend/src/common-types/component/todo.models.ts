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
 * Defines the dashboard's todo list for the authenticated user.
 */
export interface TodoList {
  /**
   * The list of active todo items.
   */
  todos: Array<Todo>;
}
