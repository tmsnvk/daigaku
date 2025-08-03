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
 * Defines the dashboard's Todo list for the authenticated user.
 */
export interface TodoList {
  /**
   * The list of active Todo items.
   */
  readonly todos: Array<Todo>;
}
