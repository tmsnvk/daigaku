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
 * Defines the {@link useTodoList} custom hook's return value properties.
 *
 * @since 0.0.1
 */
export interface TodoList {
  /**
   * The list of active todo items.
   */
  todos: Array<Todo>;
}

/**
 * Defines a single Todo item.
 *
 * @since 0.0.1
 */
export type Todo = string;

/**
 * Evaluates the current todo items based on the provided dashboard statistics.
 *
 * @param data The dashboard statistics containing application-related aggregate data.
 * @return {TodoList}
 *
 * @since 0.0.1
 */
export const useTodoList = (data: DashboardStatistics): TodoList => {
  // An array of todo items.
  const todos: Array<Todo> = [];

  // Evaluates which todo items should be added to the todos array.
  const evaluateTodos = (): void => {
    // No applications made.
    data.applicationsCount === 0 && todos.push(noApplications);

    // No applications are in the 'Submitted' status.
    data.submittedApplicationsCount === 0 && todos.push(noSubmittedApplications);

    if (data.submittedApplicationsCount > 0) {
      // There is no InterviewStatus set for submitted applications.
      data.notSetInterviewStatusCount && todos.push(noInterviewStatusSet);

      // There is no firm choice application selected.
      !data.firmChoiceTileDto && todos.push(noFirmChoiceSet);

      // OfferStatus is not updated on any of the 'Submitted' applications.
      data.offersCount === 0 && todos.push(noOfferStatusSet);
    }

    // There are offers but no FinalDestinationStatus is set.
    data.offersCount && !data.finalDestinationTileDto && todos.push(noFinalDestinationSet);

    // There are no todo items.
    if (todos.length === 0) {
      todos.push(noTodo);
    }
  };

  evaluateTodos();

  return {
    todos,
  };
};
