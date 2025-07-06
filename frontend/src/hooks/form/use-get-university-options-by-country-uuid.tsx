/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { universityService } from '@daigaku/services';

/* configuration, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { UniversityOptionResponse } from '@daigaku/common-types';

/**
 * Fetches a list of {@link UniversityOptionResponse} objects.
 * The request to the server is initiated only when a country is chosen in the given form.
 *
 * @param selectedCountryUuid The selected country's uuid string.
 * @return {UseQueryResult<Array<UniversityOptionResponse>, CoreApiError>}
 */
export const useGetUniversityOptionsByCountryUuid = (
  selectedCountryUuid: string,
): UseQueryResult<Array<UniversityOptionResponse>, CoreApiError> => {
  return useQuery({
    queryKey: [queryKeys.university.GET_AS_SELECT_OPTIONS, selectedCountryUuid],
    queryFn: () => universityService.findOptionListByCountryUuid(selectedCountryUuid),
    enabled: !!selectedCountryUuid,
  });
};
