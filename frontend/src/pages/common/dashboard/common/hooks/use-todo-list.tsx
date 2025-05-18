/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useTranslation } from 'react-i18next';

/* configuration, utilities, constants imports */
import { StudentDashboardStatisticsResponse, Todo, TodoList } from '@daigaku/common-types';

/**
 * Evaluates the current to-do items based on the provided dashboard statistics.
 *
 * @param data The dashboard statistics containing application-record-related aggregate data.
 * @return {TodoList}
 */
export const useTodoList = (data: StudentDashboardStatisticsResponse): TodoList => {
  const { t } = useTranslation();

  const todos: Array<Todo> = [];

  const evaluateTodos = (): void => {
    // No applications made.
    if (data.applicationsCount === 0) {
      todos.push(t('noApplicationRecordsTodo'));
    }

    // No applications are in the 'Submitted' status.
    if (data.submittedApplicationsCount === 0) {
      todos.push(t('noSubmittedApplicationRecordsTodo'));
    }

    if (data.submittedApplicationsCount > 0) {
      // There is no InterviewStatus set for submitted applications.
      if (data.notSetInterviewStatusCount) {
        todos.push(t('noInterviewSetTodo'));
      }

      // There is no firm choice application selected.
      if (!data.firmChoiceTileDetails) {
        todos.push(t('noFirmChoiceSetTodo'));
      }

      // OfferStatus is not updated on any of the 'Submitted' applications.
      if (data.offersCount === 0) {
        todos.push(t('noOfferSetTodo'));
      }
    }

    // There are offers but no FinalDestinationStatus is set.
    if (data.offersCount && !data.finalDestinationTileDetails) {
      todos.push(t('noFinalDestinationSetTodo'));
    }

    // There are no to-do items.
    if (todos.length === 0) {
      todos.push(t('emptyTodoList'));
    }
  };

  evaluateTodos();

  return {
    todos,
  };
};
