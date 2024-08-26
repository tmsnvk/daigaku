/**
 * @prettier
 */

import {
  noApplications,
  noFinalDestinationSet,
  noFirmChoiceSet,
  noInterviewStatusSet,
  noOfferStatusSet,
  noSubmittedApplications,
  noTodo,
} from './todo-list.utilities';
import { DashboardData } from '../../dashboard.hooks';

export interface CreateCurrentTodos {
  currentTodos: Array<string>;
}

export const useCreateCurrentTodos = (data: DashboardData): CreateCurrentTodos => {
  const currentTodos: Array<string> = [];

  const getCurrentTodos = (): void => {
    !data.numberOfApplications && currentTodos.push(noApplications);
    !data.numberOfSubmittedStatus && currentTodos.push(noSubmittedApplications);

    if (data.numberOfSubmittedStatus) {
      data.numberOfNotSetInterviewStatus && currentTodos.push(noInterviewStatusSet);
      !data.firmChoiceDto && currentTodos.push(noFirmChoiceSet);
      !data.numberOfOffers && currentTodos.push(noOfferStatusSet);
    }

    data.numberOfOffers && !data.finalDestinationDto && currentTodos.push(noFinalDestinationSet);
  };

  if (!currentTodos.length) {
    currentTodos.push(noTodo);
  }

  getCurrentTodos();

  return {
    currentTodos,
  };
};
