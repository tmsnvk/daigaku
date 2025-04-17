/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';

/* interface, type, enum imports */
import { StudentDashboardStatistics, Todo, TodoList } from '@daigaku/common-types';

/**
 * Evaluates the current todo items based on the provided dashboard statistics.
 *
 * @param data The dashboard statistics containing application-related aggregate data.
 * @return {TodoList}
 */
export const useTodoList = (data: StudentDashboardStatistics): TodoList => {
  // An array of todo items.
  const todos: Array<Todo> = [];

  // Evaluates which todo items should be added to the todos array.
  const evaluateTodos = (): void => {
    // No applications made.
    if (data.applicationsCount === 0) {
      todos.push(l.PAGES.COMMON.DASHBOARD.TODO_LIST.NO_APPLICATIONS);
    }

    // No applications are in the 'Submitted' status.
    if (data.submittedApplicationsCount === 0) {
      todos.push(l.PAGES.COMMON.DASHBOARD.TODO_LIST.NO_SUBMITTED_APPLICATIONS);
    }

    if (data.submittedApplicationsCount > 0) {
      // There is no InterviewStatus set for submitted applications.
      if (data.notSetInterviewStatusCount) {
        todos.push(l.PAGES.COMMON.DASHBOARD.TODO_LIST.NO_INTERVIEW_SET);
      }

      // There is no firm choice application selected.
      if (!data.firmChoiceTileDetails) {
        todos.push(l.PAGES.COMMON.DASHBOARD.TODO_LIST.NO_FIRM_CHOICE_SET);
      }

      // OfferStatus is not updated on any of the 'Submitted' applications.
      if (data.offersCount === 0) {
        todos.push(l.PAGES.COMMON.DASHBOARD.TODO_LIST.NO_OFFER_SET);
      }
    }

    // There are offers but no FinalDestinationStatus is set.
    if (data.offersCount && !data.finalDestinationTileDetails) {
      todos.push(l.PAGES.COMMON.DASHBOARD.TODO_LIST.NO_FINAL_DESTINATION_SET);
    }

    // There are no todo items.
    if (todos.length === 0) {
      todos.push(l.PAGES.COMMON.DASHBOARD.TODO_LIST.EMPTY_TODO_LIST);
    }
  };

  evaluateTodos();

  return {
    todos,
  };
};
