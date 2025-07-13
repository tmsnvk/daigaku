/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult } from '@tanstack/react-query';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { institutionService } from '@daigaku/services';
import { useCoreApiQuery } from '../configuration/use-core-api';

/* configuration, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { InstitutionOptionResponse } from '@daigaku/common-types';

/**
 * Fetches a list of {@link InstitutionOptionResponse} objects.
 *
 * @return {UseQueryResult<Array<InstitutionOptionResponse>, CoreApiError>}
 */
export const useGetInstitutionOptions = (): UseQueryResult<Array<InstitutionOptionResponse>, CoreApiError> => {
  return useCoreApiQuery([queryKeys.institutions.GET_AS_SELECT_OPTIONS], () => institutionService.findOptionList());
};
