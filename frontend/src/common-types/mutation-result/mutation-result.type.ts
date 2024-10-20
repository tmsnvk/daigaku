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
 * Defines the result of a `react-query` mutation operation.
 *
 * @template T The data type  returned on success.
 * @template E The error type returned on failure.
 * @template V The variables type passed to the mutation.
 *
 * @since 0.0.1
 */
export type MutationResult<T, E, V> = UseMutationResult<T, E, V, unknown>;
