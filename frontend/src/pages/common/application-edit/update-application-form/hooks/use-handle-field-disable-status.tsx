/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { ChangeEvent, useState } from 'react';

/* interface, type, enum, schema imports */
import { Application, ApplicationStatus, InterviewStatus, OfferStatus, ResponseStatus } from '@daigaku/common-types';

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
  validateInterviewStatus: (application: Application, updatedData: Application | undefined) => boolean;

  /**
   * TODO
   *
   * @param application
   * @param updatedData
   * @param selectOptions
   * @returns
   */
  validateOfferStatus: (application: Application, updatedData: Application | undefined) => boolean;

  /**
   * TODO
   *
   * @param application
   * @param updatedData
   * @param selectOptions
   * @returns
   */
  validateResponseStatus: (application: Application, updatedData: Application | undefined) => boolean;

  /**
   * TODO
   *
   * @param application
   * @param updatedData
   * @returns
   */
  validateFinalDestinationStatus: (application: Application, updatedData: Application | undefined) => boolean;
}

const pageLoadValidationService: PageLoadValidationService = {
  validateInterviewStatus: (application: Application, updatedData: Application | undefined): boolean => {
    return !(
      application.applicationStatus === ApplicationStatus.SUBMITTED ||
      updatedData?.applicationStatus === ApplicationStatus.SUBMITTED
    );
  },
  validateOfferStatus: (application: Application, updatedData: Application | undefined): boolean => {
    if (!application.interviewStatus) {
      return true;
    }

    return (
      application.interviewStatus === InterviewStatus.NOT_INVITED ||
      updatedData?.interviewStatus === InterviewStatus.NOT_INVITED
    );
  },
  validateResponseStatus: (application: Application, updatedData: Application | undefined): boolean => {
    if (!application.offerStatus) {
      return true;
    }

    return application.offerStatus === OfferStatus.REJECTED || updatedData?.offerStatus === OfferStatus.REJECTED;
  },
  validateFinalDestinationStatus: (application: Application, updatedData: Application | undefined): boolean => {
    if (!application.offerStatus) {
      return true;
    }

    return (
      application.offerStatus === OfferStatus.REJECTED ||
      updatedData?.offerStatus === OfferStatus.REJECTED ||
      application.responseStatus === ResponseStatus.OFFER_DECLINED ||
      updatedData?.responseStatus === ResponseStatus.OFFER_DECLINED
    );
  },
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
    // If ApplicationStatus is set either to 'Planned' or 'Withdrawn', all fields are disabled.
    if (
      application.applicationStatus === ApplicationStatus.PLANNED ||
      updatedData?.applicationStatus === ApplicationStatus.PLANNED ||
      application.applicationStatus === ApplicationStatus.WITHDRAWN ||
      updatedData?.applicationStatus === ApplicationStatus.WITHDRAWN
    ) {
      setFieldsReadOnlyStatus({
        ...fieldsReadOnlyStatus,
        isInterviewStatusReadOnly: true,
        isOfferStatusReadOnly: true,
        isResponseStatusReadOnly: true,
        isFinalDestinationStatusReadOnly: true,
      });
    }

    if (
      application.applicationStatus === ApplicationStatus.SUBMITTED ||
      updatedData?.applicationStatus === ApplicationStatus.SUBMITTED
    ) {
      setFieldsReadOnlyStatus({
        isApplicationStatusReadOnly: false,
        isInterviewStatusReadOnly: pageLoadValidationService.validateInterviewStatus(application, updatedData),
        isOfferStatusReadOnly: pageLoadValidationService.validateOfferStatus(application, updatedData),
        isResponseStatusReadOnly: pageLoadValidationService.validateResponseStatus(application, updatedData),
        isFinalDestinationStatusReadOnly: pageLoadValidationService.validateFinalDestinationStatus(
          application,
          updatedData,
        ),
      });
    }
  };

  // The method runs when the ApplicationStatus field is updated.
  const updateInterviewStatus = (event: ChangeEvent<HTMLSelectElement>): void => {
    const eventTargetValue = event.target.value;

    // If ApplicationStatus is set either to 'Planned' or 'Withdrawn', the following fields are disabled.
    // If ApplicationStatus is set to 'Submitted', InterviewStatus is activated.
    if (eventTargetValue === ApplicationStatus.PLANNED || eventTargetValue === ApplicationStatus.WITHDRAWN) {
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
        isOfferStatusReadOnly: pageLoadValidationService.validateOfferStatus(application, updatedData),
        isResponseStatusReadOnly: pageLoadValidationService.validateResponseStatus(application, updatedData),
        isFinalDestinationStatusReadOnly: pageLoadValidationService.validateFinalDestinationStatus(
          application,
          updatedData,
        ),
      });
    }
  };

  // The method runs when the InterviewStatus field is updated.
  const updateOfferStatus = (event: ChangeEvent<HTMLSelectElement>): void => {
    const eventTargetValue = event.target.value;

    // If InterviewStatus is set to 'Invited' or 'No interview', OfferStatus is activated.
    // If InterviewStatus is set to 'Not invited', the following fields are disabled.
    if (eventTargetValue === InterviewStatus.INVITED || eventTargetValue === InterviewStatus.NO_INTERVIEW) {
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
  };

  // The method runs when the OfferStatus field is updated.
  const updateResponseStatus = (event: ChangeEvent<HTMLSelectElement>): void => {
    const eventTargetValue = event.target.value;

    // If OfferStatus is set to 'Conditional', 'Deferred' or 'Unconditional', ResponseStatus is activated.
    // If OfferStatus is set to 'Rejected', the following fields are disabled.
    if (
      eventTargetValue === OfferStatus.CONDITIONAL ||
      eventTargetValue === OfferStatus.DEFERRED ||
      eventTargetValue === OfferStatus.UNCONDITIONAL
    ) {
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
  };

  // The method runs when the ResponseStatus field is updated.
  const updateFinalDestinationStatus = (event: ChangeEvent<HTMLSelectElement>): void => {
    const eventTargetValue = event.target.value;

    // If OfferStatus is set to 'Offer Declined', the following fields are disabled.
    if (eventTargetValue === ResponseStatus.OFFER_DECLINED) {
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
