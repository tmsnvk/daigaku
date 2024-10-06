/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* interface, type, enum imports */
import { UseMutationResult } from '@tanstack/react-query';

/**
 * @type
 * @description
 * The interface represents the result of a `react-query` mutation operation.
 *
 * @template T The type of the data returned from the mutation on success.
 * @template E The type of error returned from the mutation on failure.
 * @template V The type of variables accepted by the mutation.
 *
 * @since 0.0.1
 */
export type MutationResult<T, E, V> = UseMutationResult<T, E, V, unknown>;
