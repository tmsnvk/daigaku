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
import { CoreErrorResponse, LoginRequest, LoginResponse, MutationResult } from '@common-types';

/**
 * Defines the {@link useHandleLoginForm} custom hook's return value properties.
 */
export type HandleLoginForm = MutationResult<LoginResponse, AxiosError<CoreErrorResponse>, LoginRequest>;
