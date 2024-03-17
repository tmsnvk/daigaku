import {
  noApplications,
  noFinalDestinationSet,
  noFirmChoiceSet,
  noInterviewStatusSet,
  noOfferStatusSet,
  noSubmittedApplications,
} from './TodoList.utilities.ts';
import { DashboardDataT } from '@pages/Dashboard/Dashboard.hooks.tsx';

const useCreateCurrentTodos = (data: DashboardDataT) => {
  const currentTodos: string[] = [];

  const getCurrentTodos = () => {
    !data.numberOfApplications && currentTodos.push(noApplications);
    !data.numberOfSubmittedStatus && currentTodos.push(noSubmittedApplications);

    if (data.numberOfSubmittedStatus) {
      data.numberOfNotSetInterviewStatus && currentTodos.push(noInterviewStatusSet);
      !data.firmChoiceCourseName && currentTodos.push(noFirmChoiceSet);
      !data.numberOfOffers && currentTodos.push(noOfferStatusSet);
    }

    data.numberOfOffers && !data.finalDestinationCourseName && currentTodos.push(noFinalDestinationSet);
  };

  getCurrentTodos();

  return {
    currentTodos,
  };
};

export {
  useCreateCurrentTodos,
};
