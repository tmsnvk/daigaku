/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { Todo } from './student-layout.hooks';

export const introduction: Array<string> = [
  'Review your to-do list below. Keep in mind that nothing is urgent on this list!',
  'Certain items might only be fulfilled towards the end of your application period or school year.',
  'What is important is that you update your applications when you made any progress. You are the one responsible for minding your deadlines.',
  'Let your mentor know if you have any blocking issues, concerns or questions!',
  'Your current to-do items:',
];

export const noApplications: Todo = `
  You have not yet submitted any applications. If you have any blocking issues, get in touch with your mentor or school administrator.`;

export const noSubmittedApplications: Todo = `
  You currently have only 'Planned' applications. Make sure to submit your applications once your deadlines are closing in.`;

export const noInterviewStatusSet: Todo = 'You have not yet updated the interview status of any of your applications.';

export const noFirmChoiceSet: Todo = 'You have not yet indicated your firm choice.';

export const noOfferStatusSet: Todo = 'You have not yet indicated whether you have received any offers.';

export const noFinalDestinationSet: Todo = 'You have not yet indicated your final destination.';

export const noTodo: Todo = 'You have no items on your to-do list.';
