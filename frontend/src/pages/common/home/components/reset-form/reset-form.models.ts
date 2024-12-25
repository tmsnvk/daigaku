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
import { AccountResetRequest, CoreErrorResponse, MutationResult } from '@common-types';

/**
 * Defines the {@link useSubmitRegistrationForm} custom hook's return value properties.
 */
export type HandleResetForm = MutationResult<void, AxiosError<CoreErrorResponse>, AccountResetRequest>;
