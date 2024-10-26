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

/* external imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { universityService } from '@services/index.ts';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { ListQueryResult } from '@common-types';
import { UniversityOption } from '@services/support/university.service';

/**
 * Fetches a list of {@link UniversityOption} objects.
 * The request to the server is initiated only when a country has been chosen in the form.
 *
 * @param isCountryFieldSelected Indicates if a country is selected.
 * @param selectedCountryUuid The selected country's uuid.
 * @return {ListQueryResult<UniversityOption>}
 *
 * @since 0.0.1
 */
export const useGetUniversityOptionsByCountryUuid = (
  isCountryFieldSelected: boolean,
  selectedCountryUuid: string,
): ListQueryResult<UniversityOption> => {
  return useQuery({
    queryKey: [queryKeys.UNIVERSITY.GET_AS_SELECT_OPTIONS, selectedCountryUuid],
    queryFn: () => universityService.getDropdownOptionsByCountryUuid(selectedCountryUuid),
    enabled: isCountryFieldSelected,
  });
};
