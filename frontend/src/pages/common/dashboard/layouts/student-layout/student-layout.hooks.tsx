/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { constants } from './student-layout.constants';

/* interface, type, enum imports */
import { DashboardStatistics, Todo, TodoList } from '@common-types';

/**
 * Evaluates the current todo items based on the provided dashboard statistics.
 *
 * @param data The dashboard statistics containing application-related aggregate data.
 * @return {TodoList}
 */
export const useTodoList = (data: DashboardStatistics): TodoList => {
  // An array of todo items.
  const todos: Array<Todo> = [];

  // Evaluates which todo items should be added to the todos array.
  const evaluateTodos = (): void => {
    // No applications made.
    if (data.applicationsCount === 0) {
      todos.push(constants.todoList.NO_APPLICATIONS);
    }

    // No applications are in the 'Submitted' status.
    if (data.submittedApplicationsCount === 0) {
      todos.push(constants.todoList.NO_SUBMITTED_APPLICATIONS);
    }

    if (data.submittedApplicationsCount > 0) {
      // There is no InterviewStatus set for submitted applications.
      if (data.notSetInterviewStatusCount) {
        todos.push(constants.todoList.NO_INTERVIEW_SET);
      }

      // There is no firm choice application selected.
      if (!data.firmChoiceTileDetails) {
        todos.push(constants.todoList.NO_FIRM_CHOICE_SET);
      }

      // OfferStatus is not updated on any of the 'Submitted' applications.
      if (data.offersCount === 0) {
        todos.push(constants.todoList.NO_OFFER_SET);
      }
    }

    // There are offers but no FinalDestinationStatus is set.
    if (data.offersCount && !data.finalDestinationTileDetails) {
      todos.push(constants.todoList.NO_FINAL_DESTINATION_SET);
    }

    // There are no todo items.
    if (todos.length === 0) {
      todos.push(constants.todoList.EMPTY_TODO_LIST);
    }
  };

  evaluateTodos();

  return {
    todos,
  };
};
