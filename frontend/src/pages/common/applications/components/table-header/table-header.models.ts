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
import { MutationResult } from '@common-types';

/**
 * Defines the possible error types of the {@link useRequestPdfDownload} custom hook.
 */
type SendDownloadRequestErrorT = 'root';

/**
 * Defines the return value properties of the {@link useRequestPdfDownload} custom hook.
 * A `react-query` mutation object.
 */
export type RequestPdfDownload = MutationResult<void, AxiosError<SendDownloadRequestErrorT>, void>;
