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
 * Defines the result of a `react-query` query that returns a list of items.
 *
 * @template T The type of each item in the list returned by the query.
 * @template E The error type returned if the query fails.
 *
 * @since 0.0.1
 */
export type ListQueryResult<T, E = Error> = UseQueryResult<Array<T>, E>;
