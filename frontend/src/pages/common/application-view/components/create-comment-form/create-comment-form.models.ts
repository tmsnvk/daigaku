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
import { Comment, CoreErrorResponse, CreateComment, MutationResult } from '@common-types';

/**
 * Defines the return value properties of the {@link useSubmitNewComment} custom hook.
 */
export type SubmitComment = MutationResult<Comment, AxiosError<CoreErrorResponse>, CreateComment>;
