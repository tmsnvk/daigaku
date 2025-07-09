/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { LayoutStudent } from './layout-student';

/* interface, type imports */
import { StudentDashboardStatistics, UserRole, UserRoles } from '@daigaku/common-types';

/**
 *
 */
interface DashboardIndexProps {
  /**
   *
   */
  readonly dashboardStatistics: StudentDashboardStatistics;

  /**
   *
   */
  readonly userRole: UserRole | null;
}

/**
 *
 * @returns {JSX.Element}
 */
export const DashboardIndex = ({ dashboardStatistics, userRole }: DashboardIndexProps): JSX.Element => {
  return (
    <main className={'m-[5%] flex flex-row flex-wrap gap-y-20'}>
      {dashboardStatistics && userRole === UserRoles.ROLE_STUDENT && <LayoutStudent data={dashboardStatistics} />}
    </main>
  );
};
