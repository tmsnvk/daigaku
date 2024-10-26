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
import { institutionService } from '@services/index.ts';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { ListQueryResult } from '@common-types';
import { InstitutionOption } from '@services/support/institution.service';

/**
 * Fetches a list of {@link InstitutionOption} objects.
 *
 * @return {ListQueryResult<InstitutionOption>}
 *
 * @since 0.0.1
 */
export const useGetInstitutionOptions = (): ListQueryResult<InstitutionOption> => {
  return useQuery({
    queryKey: [queryKeys.INSTITUTIONS.GET_AS_SELECT_OPTIONS],
    queryFn: () => institutionService.getAllDropdownOptions(),
  });
};
