/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
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
  // Authentication context.
  const { getRoleResource }: Partial<AuthContext> = useAuth();
  const accountRole: string = getRoleResource();

  // Do not provide accountRole as queryKey identifier. It is not needed and will break the application's cache mechanism.
  return useQuery({
    queryKey: [queryKeys.application.GET_ALL_BY_ROLE],
    queryFn: () => applicationService.getAllByRole(accountRole),
  });
};
