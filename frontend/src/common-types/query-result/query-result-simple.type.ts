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
 * @type
 * @description
 * The interface represents the result of a `react-query` query that returns a single item.
 *
 * @template T The type of the item returned by the query.
 *
 * @since 0.0.1
 */
export type SimpleQueryResult<T> = UseQueryResult<T, Error>;
