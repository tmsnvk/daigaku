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

/* interface, type, enum imports */
import { CoreErrorResponse, MutationResult, ResetFormFields } from '@common-types';

/**
 * Defines the {@link useSubmitRegistrationForm} custom hook's return value properties.
 */
export type HandleResetForm = MutationResult<void, AxiosError<CoreErrorResponse>, ResetFormFields>;
