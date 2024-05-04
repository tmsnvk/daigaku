const formInformation = [
  'Review your application and update its fields once you have received decisions / information from the university.',
  `You are not able to edit the course name, university and country fields as your application is considered final. 
  If you have submitted this application by mistake with incorrect data, mark it for deletion. If you
  have changed your mind about this application, set its Application Status to 'Withdrawn'. This rule is in place for statistical reasons.`,
  `Let your mentor know if you have any questions with the application.
  If you have any issues with the site or form, reach out to our team using the 'Feedback' form.`,
];
const countryInformation = [
  'The country of your choice.',
];
const universityInformation = [
  'The university of your choice.',
];
const courseNameInformation = [
  'The course of your choice.',
];
const minorSubjectInformation = [
  'The minor subject of your choice (if any).',
];
const programmeLengthInformation = [
  'The length (years) of your chosen course.',
];
const applicationStatusInformation = [
  `Update the application status to:
  (1) 'Submitted' once you have submitted it via the university's submission portal.
  (2) 'Withdrawn' if you have decided not to move forward with the application.`,
];
const interviewStatusInformation = [
  'If this application process does not include an interview step, update the status accordingly.',
  'If an interview is part of the application process, update the field whether you are invited.',
];
const offerStatusInformation = [
  'Update the university\'s response once you have received the final decision.',
];
const responseStatusInformation = [
  'Update the field according to your preferred ranking.',
  'You may only have one Firm Choice as your number one target.',
];
const finalDestinationInformation = [
  'Update this final status once you have every necessary information.',
  `You may only have one Final Destination that is you accepted the university's offer. 
  The rest of your applications should be set to 'Not Final Destination'.`,
];
const submissionConfirmation = 'Your application was successfully updated.';

const firmChoiceSelectionError = `Only one of your applications may be set to 'Firm  Choice' status.`;
const finalDestinationSelectionError = `Only one of your applications may be set to 'Final Destination' or 'Final Destination (Deferred Entry)' status.`;

export {
  formInformation,
  universityInformation,
  countryInformation,
  courseNameInformation,
  minorSubjectInformation,
  programmeLengthInformation,
  applicationStatusInformation,
  interviewStatusInformation,
  offerStatusInformation,
  responseStatusInformation,
  finalDestinationInformation,
  submissionConfirmation,
  firmChoiceSelectionError,
  finalDestinationSelectionError,
};
