/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { UseQueryResult } from '@tanstack/react-query';

/**
 * Defines the result of a `react-query` query that returns a list of items.
 * This type is a wrapper around the `UseQueryResult` type from `react-query`, specifically designed to handle queries that return an array of items.
 *
 * @template T The type of each item in the list returned by the query. This represents the expected structure of the items within the array.
 * @template E The error type returned if the query fails. Defaults to the standard `Error` type, but can be customized to represent specific error structures.
 *
 * @since 0.0.1
 */
export type ListQueryResult<T, E = Error> = UseQueryResult<Array<T>, E>;
