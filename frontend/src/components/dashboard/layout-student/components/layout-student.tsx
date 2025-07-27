/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useTodoList } from '../../common/hooks/use-todo-list.tsx';

/* component imports */
import { LayoutSectionWrapper } from '../../common/components/layout-section-wrapper.tsx';
import { TileDetail } from '../../common/components/tile-detail.tsx';
import { TileStatistic } from '../../common/components/tile-statistic.tsx';
import { TodoList } from '../../common/components/todo-list.tsx';

/* interface, type imports */
import { StudentDashboardStatistics } from '@daigaku/common-types';

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
      <TodoList
        introduction={t('application.page.dashboard.todoListInstructions')}
        currentTodoItemsTitle={t('application.page.dashboard.currentTodoItems')}
        currentTodoItems={todos}
      />
      <LayoutSectionWrapper>
        <TileStatistic
          title={t('application.page.dashboard.applicationsTile')}
          value={data.applicationsCount}
        />
        <TileStatistic
          title={t('application.page.dashboard.plannedApplicationsTile')}
          value={data.plannedApplicationsCount}
        />
        <TileStatistic
          title={t('application.page.dashboard.submittedApplicationsTile')}
          value={data.submittedApplicationsCount}
        />
        <TileStatistic
          title={t('application.page.dashboard.withdrawnApplicationsTile')}
          value={data.withdrawnStatusCount}
        />
      </LayoutSectionWrapper>
      <LayoutSectionWrapper>
        <TileStatistic
          title={t('application.page.dashboard.distinctCountriesTile')}
          value={data.distinctCountriesCount}
        />
        <TileStatistic
          title={t('application.page.dashboard.distinctUniversitiesTile')}
          value={data.distinctUniversitiesCount}
        />
      </LayoutSectionWrapper>
      <LayoutSectionWrapper>
        <TileStatistic
          title={t('application.page.dashboard.offersTile')}
          value={data.offersCount}
        />
        {data.firmChoiceTileDetails && (
          <TileDetail
            title={t('application.page.dashboard.firmChoiceTile')}
            country={data.firmChoiceTileDetails.countryName ?? ''}
            university={data.firmChoiceTileDetails.universityName ?? t('application.page.dashboard.notYetSelectedTile')}
            courseName={data.firmChoiceTileDetails.courseName ?? ''}
          />
        )}
        {data.finalDestinationTileDetails && (
          <TileDetail
            title={t('application.page.dashboard.finalDestinationTile')}
            country={data.finalDestinationTileDetails.countryName ?? ''}
            university={
              data.finalDestinationTileDetails.universityName ?? t('application.page.dashboard.notYetSelectedTile')
            }
            courseName={data.finalDestinationTileDetails.courseName ?? ''}
          />
        )}
      </LayoutSectionWrapper>
    </>
  );
};
