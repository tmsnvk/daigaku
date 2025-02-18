/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { universityService } from '@services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { ListQueryResult, UniversityOption } from '@common-types';

/**
 * Fetches a list of {@link UniversityOption} objects.
 * The request to the server is initiated only when a country is chosen in the given form.
 *
 * @param isCountryFieldSelected Indicates if a country is selected.
 * @param selectedCountryUuid The selected country's uuid string.
 * @return {ListQueryResult<UniversityOption>}
 */
export const useGetUniversityOptionsByCountryUuid = (
  isCountryFieldSelected: boolean,
  selectedCountryUuid: string,
): ListQueryResult<UniversityOption> => {
  return useQuery({
    queryKey: [queryKeys.UNIVERSITY.GET_AS_SELECT_OPTIONS, selectedCountryUuid],
    queryFn: () => universityService.getAllOptionsByCountryUuid(selectedCountryUuid),
    enabled: isCountryFieldSelected,
  });
};
