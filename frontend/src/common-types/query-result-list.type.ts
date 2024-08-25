/**
 * @prettier
 */

import { UseQueryResult } from '@tanstack/react-query';

export type ListQueryResult<T> = UseQueryResult<Array<T>, Error>;
