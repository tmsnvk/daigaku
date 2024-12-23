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
import { Application, CoreErrorResponse, MutationResult, UpdateApplicationFormFields } from '@common-types';

/**
 * Defines the return value properties of the {@link useHandleFormSubmission}, {@link useUpdateApplication} custom hooks.
 */
export interface HandleFormSubmission {
  submitForm: (
    formData: UpdateApplicationFormFields,
    applicationUuid: string,
    mutate: (formData: UpdateApplicationFormFields) => void,
    setError: UseFormSetError<UpdateApplicationFormFields>,
  ) => void;
}

/**
 * Defines the return value properties of the {@link useUpdateApplication} custom hook.
 */
export type UpdateApplicationForm = MutationResult<Application, AxiosError<CoreErrorResponse>, UpdateApplicationFormFields>;

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
