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
import { CoreErrorResponse, MutationResult, RegistrationFormFields } from '@common-types';

/**
 * Defines the {@link useSubmitRegistrationForm} custom hook's return value properties.
 */
export type HandleRegistrationForm = MutationResult<void, AxiosError<CoreErrorResponse>, RegistrationFormFields>;
