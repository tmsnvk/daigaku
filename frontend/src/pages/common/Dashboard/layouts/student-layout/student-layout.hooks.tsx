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

/* configuration, utilities, constants imports */
import {
  noApplications,
  noFinalDestinationSet,
  noFirmChoiceSet,
  noInterviewStatusSet,
  noOfferStatusSet,
  noSubmittedApplications,
  noTodo,
} from './student-layout.utilities';

/* interface, type, enum imports */
import { DashboardStatistics } from '../../dashboard.hooks';

/**
 * ===============
 * Custom Hook {@link useTodoList}
 * ===============
 */

/**
 * The interface represents the {@link useSortOrder} custom hook's return value properties.
 *
 * @since 0.0.1
 */
export interface TodoList {
  todos: Array<Todo>;
}

/**
 * The type represents a single Todo item.
 *
 * @since 0.0.1
 */
export type Todo = string;

/**
 * @description
 * The custom hook evaluates the current todo items based on the provided dashboard statistics.
 *
 * @param data The dashboard statistics containing application-related aggregate data.

 * @returns {TodoList} The list of active todo items.
 *
 * @since 0.0.1
 */
export const useTodoList = (data: DashboardStatistics): TodoList => {
  const todos: Array<Todo> = [];

  const evaluateTodos = (): void => {
    data.applicationsCount === 0 && todos.push(noApplications);
    data.submittedApplicationsCount === 0 && todos.push(noSubmittedApplications);

    if (data.submittedApplicationsCount > 0) {
      data.notSetInterviewStatusCount && todos.push(noInterviewStatusSet);
      !data.firmChoice && todos.push(noFirmChoiceSet);
      data.offersCount === 0 && todos.push(noOfferStatusSet);
    }

    data.offersCount && !data.finalDestination && todos.push(noFinalDestinationSet);

    if (todos.length === 0) {
      todos.push(noTodo);
    }
  };

  evaluateTodos();

  return {
    todos,
  };
};
