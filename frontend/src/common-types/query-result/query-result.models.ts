/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult } from '@tanstack/react-query';

/**
 * Defines the result of a `react-query` query that returns a list of items.
 * This type is a wrapper around the `UseQueryResult` type from `react-query`,
 * specifically designed to handle queries that return an array of items.
 *
 * @template T The type of each item in the list returned by the query.
 * This represents the expected structure of the items within the array.
 * @template E The error type returned if the query fails.
 * Defaults to the standard `Error` type, but can be customized to represent specific error structures.
 */
export type ListQueryResult<T, E = Error> = UseQueryResult<Array<T>, E>;

/**
 * Defines the result of a query that returns a single item using `react-query`.
 * This type is a wrapper around the `UseQueryResult` type from `react-query`,
 * specifically designed to handle queries that return a single data item.
 *
 * @template T The type of the item returned by the query.
 * This represents the expected structure of the data object.
 * @template E The error type returned if the query fails.
 * Defaults to the standard `Error` type, but can be customized to represent specific error structures.
 */
export type SimpleQueryResult<T, E = Error> = UseQueryResult<T, E>;
