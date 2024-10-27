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
import { UseQueryResult } from '@tanstack/react-query';

/**
 * Defines the result of a query that returns a single item using `react-query`.
 * This type is a wrapper around the `UseQueryResult` type from `react-query`, specifically designed to handle queries that return a single data item.
 *
 * @template T The type of the item returned by the query. This represents the expected structure of the data object.
 * @template E The error type returned if the query fails. Defaults to the standard `Error` type, but can be customized to represent specific error structures.
 *
 * @since 0.0.1
 */
export type SimpleQueryResult<T, E = Error> = UseQueryResult<T, E>;
