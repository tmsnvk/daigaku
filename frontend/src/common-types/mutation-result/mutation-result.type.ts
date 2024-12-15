/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { UseMutationResult } from '@tanstack/react-query';

/**
 * Defines the result of a mutation operation using `react-query`.
 * This type is a wrapper around the `UseMutationResult` type from `react-query`, providing a structured response for mutation operations in a React application.
 *
 * @template T The data type returned upon successful mutation. This represents the expected shape of the data that the mutation will produce.
 * @template E The error type returned when the mutation fails. This should indicate the structure of the error information.
 * @template V The type of variables that can be passed to the mutation function. This represents any parameters required to execute the mutation.
 *
 * @since 0.0.1
 */
export type MutationResult<T, E, V> = UseMutationResult<T, E, V, unknown>;
