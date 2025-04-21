/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines a single to-do item.
 */
export type Todo = string;

/**
 * Defines the dashboard's to-do list for the authenticated user.
 */
export interface TodoList {
  /**
   * The list of active to-do items.
   */
  readonly todos: Array<Todo>;
}
