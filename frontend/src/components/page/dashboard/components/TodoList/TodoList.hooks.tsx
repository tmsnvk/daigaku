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
  const createCurrentTodos = () => {
    const currentTodos: string[] = [];

    if (!data.numberOfApplications) {
      currentTodos.push(noApplications);
    }

    if (data.numberOfApplications && !data.numberOfSubmittedStatus) {
      currentTodos.push(noSubmittedApplications);
    }

    if (data.numberOfSubmittedStatus && data.numberOfNotSetInterviewStatus) {
      currentTodos.push(noInterviewStatusSet);
    }

    if (data.numberOfSubmittedStatus && !data.firmChoiceCourseName) {
      currentTodos.push(noFirmChoiceSet);
    }

    if (data.numberOfSubmittedStatus && !data.numberOfOffers) {
      currentTodos.push(noOfferStatusSet);
    }

    if (data.numberOfOffers && !data.finalDestinationCourseName) {
      currentTodos.push(noFinalDestinationSet);
    }

    return currentTodos.map((paragraph, index) => {
      return <li key={index}>{paragraph}</li>;
    });
  };

  return {
    createCurrentTodos,
  };
};

export {
  useCreateCurrentTodos,
};
