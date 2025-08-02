/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* component imports */
import { LayoutSectionWrapper } from '../../common/components/layout-section-wrapper.tsx';
import { TileDetail } from '../../common/components/tile-detail.tsx';
import { TileStatistic } from '../../common/components/tile-statistic.tsx';
import { TodoList } from '../../common/components/todo-list.tsx';

/* interface, type imports */
import { StudentDashboardStatistics } from '@daigaku/common-types';
import { useTodoList } from 'components/dashboard/common/hooks/use-todo-list.tsx';

/**
 * Defines the component's properties.
 */
interface LayoutStudentProps {
  /**
   * The object containing the {@link StudentDashboardStatistics} data.
   */
  readonly data: StudentDashboardStatistics;
}

/**
 * Renders the application's dashboard for users with Student authorisation.
 *
 * @param {LayoutStudentProps} props
 * @return {JSX.Element}
 */
export const LayoutStudent = ({ data }: LayoutStudentProps): JSX.Element => {
  const { t } = useTranslation();

  const { todos } = useTodoList(data);

  return (
    <>
      <TodoList currentTodoItems={todos} />
      <LayoutSectionWrapper>
        <TileStatistic
          title={t('app.page.dashboard.statistics.applications')}
          value={data.applicationsCount}
        />
        <TileStatistic
          title={t('app.page.dashboard.statistics.plannedApplications')}
          value={data.plannedApplicationsCount}
        />
        <TileStatistic
          title={t('app.page.dashboard.statistics.submittedApplications')}
          value={data.submittedApplicationsCount}
        />
        <TileStatistic
          title={t('app.page.dashboard.statistics.withdrawnApplications')}
          value={data.withdrawnStatusCount}
        />
      </LayoutSectionWrapper>
      <LayoutSectionWrapper>
        <TileStatistic
          title={t('app.page.dashboard.statistics.distinctCountries')}
          value={data.distinctCountriesCount}
        />
        <TileStatistic
          title={t('app.page.dashboard.statistics.distinctUniversities')}
          value={data.distinctUniversitiesCount}
        />
      </LayoutSectionWrapper>
      <LayoutSectionWrapper>
        <TileStatistic
          title={t('app.page.dashboard.statistics.offers')}
          value={data.offersCount}
        />
        {data.firmChoiceTileDetails && (
          <TileDetail
            title={t('app.page.dashboard.statistics.firmChoice')}
            country={data.firmChoiceTileDetails.countryName ?? ''}
            university={data.firmChoiceTileDetails.universityName ?? t('app.page.dashboard.statistics.notYetSelected')}
            courseName={data.firmChoiceTileDetails.courseName ?? ''}
          />
        )}
        {data.finalDestinationTileDetails && (
          <TileDetail
            title={t('app.page.dashboard.statistics.finalDestination')}
            country={data.finalDestinationTileDetails.countryName ?? ''}
            university={
              data.finalDestinationTileDetails.universityName ?? t('app.page.dashboard.statistics.notYetSelected')
            }
            courseName={data.finalDestinationTileDetails.courseName ?? ''}
          />
        )}
      </LayoutSectionWrapper>
    </>
  );
};
