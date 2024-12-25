/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

/* interface, type, enum imports */
import { Application, CoreErrorResponse, MutationResult, UpdateApplicationByStudent } from '@common-types';

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
 * Defines the return value properties of the {@link useUpdateApplication} custom hook.
 */
export type UpdateApplicationForm = MutationResult<Application, AxiosError<CoreErrorResponse>, UpdateApplicationByStudent>;

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
