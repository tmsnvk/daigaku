import {
  noApplications,
  noFinalDestinationSet,
  noFirmChoiceSet,
  noInterviewStatusSet,
  noOfferStatusSet,
  noSubmittedApplications,
  noTodo,
} from './TodoList.utilities.ts';
import { DashboardDataT } from '@pages/shared/Dashboard/Dashboard.hooks.tsx';

const useCreateCurrentTodos = (data: DashboardDataT) => {
  const currentTodos: string[] = [];

  const getCurrentTodos = () => {
    !data.numberOfApplications && currentTodos.push(noApplications);
    !data.numberOfSubmittedStatus && currentTodos.push(noSubmittedApplications);

    if (data.numberOfSubmittedStatus) {
      data.numberOfNotSetInterviewStatus && currentTodos.push(noInterviewStatusSet);
      !data.firmChoiceDto.courseName && currentTodos.push(noFirmChoiceSet);
      !data.numberOfOffers && currentTodos.push(noOfferStatusSet);
    }

    data.numberOfOffers && !data.finalDestinationDto.courseName && currentTodos.push(noFinalDestinationSet);
  };

  if (!currentTodos.length) {
    currentTodos.push(noTodo);
  }

  getCurrentTodos();

  return {
    currentTodos,
  };
};

export {
  useCreateCurrentTodos,
};
