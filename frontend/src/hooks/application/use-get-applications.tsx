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
import { AuthContext, useAuth } from '@context/auth';
import { applicationService } from '@services/index';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { Application, ListQueryResult } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useGetApplications}
 * ===============
 */

/**
 * Fetches a list of {@link Application} objects based on the user's authorisation role.
 *
 * @return {ListQueryResult<Application>}
 *
 * @since 0.0.1
 */
export const useGetApplications = (): ListQueryResult<Application> => {
  const { getRoleResource }: Partial<AuthContext> = useAuth();
  const accountRole: string = getRoleResource();

  return useQuery({
    queryKey: [queryKeys.application.GET_ALL_BY_ROLE, accountRole],
    queryFn: () => applicationService.getAllByRole(accountRole),
  });
};
