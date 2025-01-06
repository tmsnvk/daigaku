/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseFormSetError } from 'react-hook-form';

/* interface, type, enum imports */
import { Application, ApplicationStatusSelectOptions, UpdateApplicationByStudent } from '@common-types';

/**
 * Defines the return value properties of the {@link useHandleFormSubmission}, {@link useUpdateApplication} custom hooks.
 */
export interface HandleFormSubmission {
  submitForm: (
    formData: UpdateApplicationByStudent,
    applicationUuid: string,
    mutate: (formData: UpdateApplicationByStudent) => void,
    setError: UseFormSetError<UpdateApplicationByStudent>,
  ) => void;
}

/**
 * TODO
 */
export interface FieldsReadOnlyStatus {
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
export interface HandleFieldDisableStatus {
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
  updateInterviewStatus: (eventTargetValue: string) => void;

  /**
   * TODO
   * @param eventTargetValue
   * @returns
   */
  updateOfferStatus: (eventTargetValue: string) => void;

  /**
   * TODO
   * @param eventTargetValue
   * @returns
   */
  updateResponseStatus: (eventTargetValue: string) => void;

  /**
   * TODO
   * @param eventTargetValue
   * @returns
   */
  updateFinalDestinationStatus: (eventTargetValue: string) => void;
}

/**
 * TODO
 */
export interface PageLoadValidationService {
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
    selectOptions: ApplicationStatusSelectOptions,
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
    selectOptions: ApplicationStatusSelectOptions,
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
    selectOptions: ApplicationStatusSelectOptions,
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
    selectOptions: ApplicationStatusSelectOptions,
  ) => boolean;
}
