/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useTranslation } from 'react-i18next';

/* configuration, constants imports */
import { StudentDashboardStatisticsResponse } from '@daigaku/common-types';
import { Todo, TodoList } from '../types.ts';

/**
 * Evaluates the current to-do items based on the provided dashboard statistics.
 *
 * @param data The dashboard statistics containing Application-related aggregate data.
 * @return {TodoList}
 */
export const useTodoList = (data: StudentDashboardStatisticsResponse): TodoList => {
  const { t } = useTranslation();

  const todos: Array<Todo> = [];

  const evaluateTodos = (): void => {
    // No applications made.
    if (data.applicationsCount === 0) {
      todos.push(t('app.page.dashboard.todo.noApplicationRecordsTodo'));
    }

    // No applications are in the 'Submitted' status.
    if (data.submittedApplicationsCount === 0) {
      todos.push(t('app.page.dashboard.todo.noSubmittedApplicationRecordsTodo'));
    }

    if (data.submittedApplicationsCount > 0) {
      // There is no InterviewStatus set for submitted applications.
      if (data.notSetInterviewStatusCount) {
        todos.push(t('app.page.dashboard.todo.noInterviewSetTodo'));
      }

      // There is no firm choice application selected.
      if (!data.firmChoiceTileDetails) {
        todos.push(t('app.page.dashboard.todo.noFirmChoiceSetTodo'));
      }

      // OfferStatus is not updated on any of the 'Submitted' applications.
      if (data.offersCount === 0) {
        todos.push(t('app.page.dashboard.todo.noOfferSetTodo'));
      }
    }

    // There are offers but no FinalDestinationStatus is set.
    if (data.offersCount && !data.finalDestinationTileDetails) {
      todos.push(t('app.page.dashboard.todo.noFinalDestinationSetTodo'));
    }

    // There are no to-do items.
    if (todos.length === 0) {
      todos.push(t('app.page.dashboard.todo.emptyTodoList'));
    }
  };

  evaluateTodos();

  return {
    todos,
  };
};
