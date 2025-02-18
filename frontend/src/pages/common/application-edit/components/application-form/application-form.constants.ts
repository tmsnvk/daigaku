/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

export const constants = {
  notifications: {
    LOADING: 'Your application is being updated.',
    SUBMIT: 'update application',
    errors: {
      FIRM_CHOICE_SELECTION: "Only one of your applications may be set to 'Firm  Choice' status.",
      FINAL_DESTINATION_SELECTION:
        "Only one of your applications may be set to 'Final Destination' or 'Final Destination (Deferred Entry)' status.",
    },
  },
  form: {
    TITLE: 'Update Application Form',
    INFORMATION: [
      'Review your application and update its fields once you have received decisions / information from the university.',
      `You are not able to edit the course name, university and country fields as your application is considered final.
        If you have submitted this application by mistake with incorrect data, mark it for deletion and your mentor will review it. If you
        have changed your mind about the application, set its Application Status to 'Withdrawn'.
        This rule is in place for statistical reasons.`,
      `Let your mentor know if you have any questions with the application.
        If you have any issues with the site or form, reach out to our team using the 'Feedback' form.`,
    ],
    SUBMISSION: 'Your application was successfully updated.',
    fields: {
      country: {
        NAME: 'Country',
        INFORMATION: ['The country of your choice.'],
      },
      university: {
        NAME: 'University',
        INFORMATION: ['The university of your choice.'],
      },
      courseName: {
        NAME: 'Course Name',
        INFORMATION: ['The course of your choice.'],
      },
      minorSubject: {
        NAME: 'Minor Subject',
        INFORMATION: ['The minor subject of your choice (if any).'],
      },
      programmeLength: {
        NAME: 'Programme Length',
        INFORMATION: ['The length (years) of your chosen course.'],
      },
      applicationStatus: {
        NAME: 'Application Status',
        SELECT_PROMPT: "Update the application's current status.",
        INFORMATION: [
          `Update the application status to:
            (1) 'Submitted' once you have submitted it via the university's submission portal.
            (2) 'Withdrawn' if you have decided not to move forward with the application.`,
        ],
      },
      interviewStatus: {
        NAME: 'Interview Status',
        SELECT_PROMPT: "Update the application's interview status.",
        INFORMATION: [
          'If this application process does not include an interview step, update the status accordingly.',
          'If an interview is part of the application process, update the field whether you are invited.',
        ],
      },
      offerStatus: {
        NAME: 'Offer Status',
        SELECT_PROMPT: "Update the university's decision.",
        INFORMATION: ["Update the university's response once you have received the final decision."],
      },
      responseStatus: {
        NAME: 'Response Status',
        SELECT_PROMPT: 'Update your response status.',
        INFORMATION: [
          'Update the field according to your preferred ranking.',
          'You may only have one Firm Choice as your number one target.',
        ],
      },
      finalDestination: {
        NAME: 'Final Destination Status',
        SELECT_PROMPT: 'Update your final decision regarding this application.',
        INFORMATION: [
          'Update this final status once you have every necessary information.',
          `You may only have one Final Destination that is you accepted the university's offer.
            The rest of your applications should be set to 'Not Final Destination'.`,
        ],
      },
    },
  },
};
