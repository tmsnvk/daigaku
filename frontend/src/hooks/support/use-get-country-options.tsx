/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult } from '@tanstack/react-query';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { countryService } from '@daigaku/services';
import { useCoreApiQuery } from '../configuration/use-core-api';

/* configuration, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { CountryOptionResponse } from '@daigaku/common-types';

/**
 * Fetches a list of {@link CountryOptionResponse} objects.
 *
 * @return {UseQueryResult<Array<CountryOptionResponse>, CoreApiError>}
 */
export const useGetCountryOptions = (): UseQueryResult<Array<CountryOptionResponse>, CoreApiError> => {
  return useCoreApiQuery([queryKeys.country.GET_AS_SELECT_OPTIONS], () => countryService.getAllAsOption());
};
