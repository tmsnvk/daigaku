/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { ChangeEvent, useState } from 'react';

/* interface, type, enum, schema imports */
import {
  Application,
  ApplicationStatus,
  FinalDestinationStatus,
  InterviewStatus,
  OfferStatus,
  ResponseStatus,
} from '@daigaku/common-types';

/**
 * TODO
 */
interface PageLoadValidationService {
  /**
   * TODO
   *
   * @param application
   * @param updatedData
   * @param selectOptions
   * @returns
   */
  validateInterviewStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationRecordStatusOptions,
  ) => boolean;

  /**
   * TODO
   *
   * @param application
   * @param updatedData
   * @param selectOptions
   * @returns
   */
  validateOfferStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationRecordStatusOptions,
  ) => boolean;

  /**
   * TODO
   *
   * @param application
   * @param updatedData
   * @param selectOptions
   * @returns
   */
  validateResponseStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationRecordStatusOptions,
  ) => boolean;

  /**
   * TODO
   *
   * @param application
   * @param updatedData
   * @param selectOptions
   * @returns
   */
  validateFinalDestinationStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationRecordStatusOptions,
  ) => boolean;
}

const pageLoadValidationService: PageLoadValidationService = {
  validateInterviewStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationRecordStatusOptions,
  ): boolean => {
    const submittedStatus: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter(
      (element: ApplicationStatus) => {
        return element.name === ApplicationStatus.SUBMITTED;
      },
    )[0];

    if (submittedStatus) {
      return !(
        application.applicationStatus.name === submittedStatus.name ||
        updatedData?.applicationStatus.name === submittedStatus.name
      );
    }

    return false;
  },
  validateOfferStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationRecordStatusOptions,
  ): boolean => {
    if (!application.interviewStatus?.uuid) {
      return true;
    }

    const notInvitedStatus: InterviewStatus | undefined = selectOptions.interviewStatus?.filter(
      (element: ApplicationStatus) => {
        return element.name === InterviewStatus.NOT_INVITED;
      },
    )[0];

    if (notInvitedStatus) {
      return (
        application.interviewStatus.name === notInvitedStatus.name ||
        updatedData?.interviewStatus?.name === notInvitedStatus.name
      );
    }

    return false;
  },
  validateResponseStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationRecordStatusOptions,
  ): boolean => {
    if (!application.offerStatus?.uuid) {
      return true;
    }

    const rejectedStatus: OfferStatus | undefined = selectOptions.offerStatus?.filter((element: ApplicationStatus) => {
      return element.name === OfferStatus.REJECTED;
    })[0];

    if (rejectedStatus) {
      return (
        application.offerStatus.name === rejectedStatus.name || updatedData?.offerStatus?.name === rejectedStatus.name
      );
    }

    return false;
  },
  validateFinalDestinationStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationRecordStatusOptions,
  ): boolean => {
    if (!application.offerStatus?.uuid) {
      return true;
    }

    const rejectedStatus: OfferStatus | undefined = selectOptions.offerStatus?.filter((element: ApplicationStatus) => {
      return element.name === OfferStatus.REJECTED;
    })[0];

    if (rejectedStatus) {
      return (
        application.offerStatus.name === rejectedStatus.name || updatedData?.offerStatus?.name === rejectedStatus.name
      );
    }

    const offerDeclinedStatus: ResponseStatus | undefined = selectOptions.responseStatus?.filter(
      (element: ApplicationStatus) => {
        return element.name === ResponseStatus.OFFER_DECLINED;
      },
    )[0];

    if (offerDeclinedStatus) {
      return (
        application.responseStatus?.name === offerDeclinedStatus.name ||
        updatedData?.responseStatus?.name === offerDeclinedStatus.name
      );
    }

    return false;
  },
};

/**
 * TODO
 */
type ApplicationStatusUnionArray =
  | Array<ApplicationStatus>
  | Array<InterviewStatus>
  | Array<OfferStatus>
  | Array<ResponseStatus>
  | Array<FinalDestinationStatus>;

/**
 * TODO
 *
 * @param statusList
 * @param statusUuid
 * @returns {boolean}
 */
const isStatusInList = (statusList: ApplicationStatusUnionArray, statusUuid: string): boolean => {
  return statusList.some((element) => element.uuid === statusUuid);
};

/**
 * TODO
 */
interface FieldsReadOnlyStatus {
  /**
   * TODO
   */
  isApplicationStatusReadOnly: boolean;

  /**
   * TODO
   */
  isInterviewStatusReadOnly: boolean;

  /**
   * TODO
   */
  isOfferStatusReadOnly: boolean;

  /**
   * TODO
   */
  isResponseStatusReadOnly: boolean;

  /**
   * TODO
   */
  isFinalDestinationStatusReadOnly: boolean;
}

/**
 * TODO
 */
interface HandleFieldDisableStatus {
  /**
   * TODO
   * @returns
   */
  onPageLoadValidation: () => void;

  /**
   * TODO
   */
  fieldsReadOnlyStatus: FieldsReadOnlyStatus;

  /**
   * TODO
   * @param eventTargetValue
   * @returns
   */
  updateInterviewStatus: (event: ChangeEvent<HTMLSelectElement>) => void;

  /**
   * TODO
   * @param eventTargetValue
   * @returns
   */
  updateOfferStatus: (event: ChangeEvent<HTMLSelectElement>) => void;

  /**
   * TODO
   * @param eventTargetValue
   * @returns
   */
  updateResponseStatus: (event: ChangeEvent<HTMLSelectElement>) => void;

  /**
   * TODO
   * @param eventTargetValue
   * @returns
   */
  updateFinalDestinationStatus: (event: ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * The custom hook handles the logic connected to the individual field updates, i.e. when and which field should get
 * disabled.
 *
 * @param application The {@link Application} that is going to be updated.
 * @param updatedData The updated data.
 * @returns {HandleFieldDisableStatus}
 */
export const useHandleFieldDisableStatus = (
  application: Application,
  updatedData: Application | undefined,
): HandleFieldDisableStatus => {
  // By default, all fields' isDisable status is turned off as they are updated by the onPageLoadValidation() method.
  const [fieldsReadOnlyStatus, setFieldsReadOnlyStatus] = useState<FieldsReadOnlyStatus>({
    isApplicationStatusReadOnly: false,
    isInterviewStatusReadOnly: false,
    isOfferStatusReadOnly: false,
    isResponseStatusReadOnly: false,
    isFinalDestinationStatusReadOnly: false,
  });

  const onPageLoadValidation = () => {
    const plannedStatus: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter(
      (element: ApplicationStatus) => {
        return element.name === ApplicationStatus.PLANNED;
      },
    )[0];
    const withdrawnStatus: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter(
      (element: ApplicationStatus) => {
        return element.name === ApplicationStatus.WITHDRAWN;
      },
    )[0];

    // If ApplicationStatus is set either to 'Planned' or 'Withdrawn', all fields are disabled.
    if (plannedStatus?.uuid || withdrawnStatus?.uuid) {
      if (
        application.applicationStatus.name === plannedStatus?.name ||
        updatedData?.applicationStatus.name === plannedStatus?.name ||
        application.applicationStatus.name === withdrawnStatus?.name ||
        updatedData?.applicationStatus.name === withdrawnStatus?.name
      ) {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isInterviewStatusReadOnly: true,
          isOfferStatusReadOnly: true,
          isResponseStatusReadOnly: true,
          isFinalDestinationStatusReadOnly: true,
        });
      }
    }

    const submittedStatus: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter(
      (element: ApplicationStatus) => {
        return element.name === ApplicationStatus.SUBMITTED;
      },
    )[0];

    // If ApplicationStatus is set to 'Submitted', all fields are validated based on their internal validation rules.
    if (submittedStatus?.uuid) {
      if (
        application.applicationStatus.name === submittedStatus.name ||
        updatedData?.applicationStatus.name === submittedStatus.name
      ) {
        setFieldsReadOnlyStatus({
          isApplicationStatusReadOnly: false,
          isInterviewStatusReadOnly: pageLoadValidationService.validateInterviewStatus(
            application,
            updatedData,
            selectOptions,
          ),
          isOfferStatusReadOnly: pageLoadValidationService.validateOfferStatus(application, updatedData, selectOptions),
          isResponseStatusReadOnly: pageLoadValidationService.validateResponseStatus(
            application,
            updatedData,
            selectOptions,
          ),
          isFinalDestinationStatusReadOnly: pageLoadValidationService.validateFinalDestinationStatus(
            application,
            updatedData,
            selectOptions,
          ),
        });
      }
    }
  };

  // The method runs when the ApplicationStatus field is updated.
  const updateInterviewStatus = (event: ChangeEvent<HTMLSelectElement>): void => {
    const eventTargetValue = event.target.value;

    const plannedStatus: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter(
      (element: ApplicationStatus) => {
        return element.name === ApplicationStatus.PLANNED;
      },
    )[0];
    const withdrawnStatus: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter(
      (element: ApplicationStatus) => {
        return element.name === ApplicationStatus.WITHDRAWN;
      },
    )[0];

    // If ApplicationStatus is set either to 'Planned' or 'Withdrawn', the following fields are disabled.
    // If ApplicationStatus is set to 'Submitted', InterviewStatus is activated.
    if (
      (plannedStatus && eventTargetValue === plannedStatus.uuid) ||
      (withdrawnStatus && eventTargetValue === withdrawnStatus.uuid)
    ) {
      setFieldsReadOnlyStatus({
        ...fieldsReadOnlyStatus,
        isInterviewStatusReadOnly: true,
        isOfferStatusReadOnly: true,
        isResponseStatusReadOnly: true,
        isFinalDestinationStatusReadOnly: true,
      });
    } else {
      setFieldsReadOnlyStatus({
        ...fieldsReadOnlyStatus,
        isInterviewStatusReadOnly: false,
        isOfferStatusReadOnly: pageLoadValidationService.validateOfferStatus(application, updatedData, selectOptions),
        isResponseStatusReadOnly: pageLoadValidationService.validateResponseStatus(
          application,
          updatedData,
          selectOptions,
        ),
        isFinalDestinationStatusReadOnly: pageLoadValidationService.validateFinalDestinationStatus(
          application,
          updatedData,
          selectOptions,
        ),
      });
    }
  };

  // The method runs when the InterviewStatus field is updated.
  const updateOfferStatus = (event: ChangeEvent<HTMLSelectElement>): void => {
    const eventTargetValue = event.target.value;

    const invitedStatuses: Array<OfferStatus> | undefined = selectOptions.interviewStatus?.filter(
      (element: InterviewStatus) => {
        return element.name !== InterviewStatus.NOT_INVITED;
      },
    );

    // If InterviewStatus is set to 'Invited' or 'No interview', OfferStatus is activated.
    // If InterviewStatus is set to 'Not invited', the following fields are disabled.
    if (invitedStatuses) {
      if (isStatusInList(invitedStatuses, eventTargetValue)) {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isOfferStatusReadOnly: false,
        });
      } else {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isOfferStatusReadOnly: true,
          isResponseStatusReadOnly: true,
          isFinalDestinationStatusReadOnly: true,
        });
      }
    }
  };

  // The method runs when the OfferStatus field is updated.
  const updateResponseStatus = (event: ChangeEvent<HTMLSelectElement>): void => {
    const eventTargetValue = event.target.value;

    const positiveResponseStatuses: Array<ResponseStatus> | undefined = selectOptions.offerStatus?.filter(
      (element: OfferStatus) => {
        return element.name !== OfferStatus.REJECTED;
      },
    );

    // If OfferStatus is set to 'Conditional', 'Deferred' or 'Unconditional', ResponseStatus is activated.
    // If OfferStatus is set to 'Rejected', the following fields are disabled.
    if (positiveResponseStatuses) {
      if (isStatusInList(positiveResponseStatuses, eventTargetValue)) {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isResponseStatusReadOnly: false,
          isFinalDestinationStatusReadOnly: false,
        });
      } else {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isResponseStatusReadOnly: true,
          isFinalDestinationStatusReadOnly: true,
        });
      }
    }
  };

  // The method runs when the ResponseStatus field is updated.
  const updateFinalDestinationStatus = (event: ChangeEvent<HTMLSelectElement>): void => {
    const eventTargetValue = event.target.value;

    const offerDeclinedStatus: ResponseStatus | undefined = selectOptions.responseStatus?.filter(
      (element: ResponseStatus) => {
        return element.name === ResponseStatus.OFFER_DECLINED;
      },
    )[0];

    // If OfferStatus is set to 'Offer Declined', the following fields are disabled.
    if (offerDeclinedStatus && eventTargetValue === offerDeclinedStatus.uuid) {
      setFieldsReadOnlyStatus({
        ...fieldsReadOnlyStatus,
        isFinalDestinationStatusReadOnly: true,
      });
    }
  };

  return {
    onPageLoadValidation,
    fieldsReadOnlyStatus,
    updateInterviewStatus,
    updateOfferStatus,
    updateResponseStatus,
    updateFinalDestinationStatus,
  };
};
