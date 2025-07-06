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
        introduction={t('todoListInstructions')}
        currentTodoItemsTitle={t('currentTodoItems')}
        currentTodoItems={todos}
      />
      <LayoutSectionWrapper>
        <TileStatistic
          title={t('applicationRecordsTile')}
          value={data.applicationsCount}
        />
        <TileStatistic
          title={t('plannedApplicationRecordsTile')}
          value={data.plannedApplicationsCount}
        />
        <TileStatistic
          title={t('submittedApplicationRecordsTile')}
          value={data.submittedApplicationsCount}
        />
        <TileStatistic
          title={t('withdrawnApplicationRecordsTile')}
          value={data.withdrawnStatusCount}
        />
      </LayoutSectionWrapper>
      <LayoutSectionWrapper>
        <TileStatistic
          title={t('distinctCountriesTile')}
          value={data.distinctCountriesCount}
        />
        <TileStatistic
          title={t('distinctUniversitiesTile')}
          value={data.distinctUniversitiesCount}
        />
      </LayoutSectionWrapper>
      <LayoutSectionWrapper>
        <TileStatistic
          title={t('offersTile')}
          value={data.offersCount}
        />
        {data.firmChoiceTileDetails && (
          <TileDetail
            title={t('firmChoiceTile')}
            country={data.firmChoiceTileDetails.countryName ?? ''}
            university={data.firmChoiceTileDetails.universityName ?? t('notYetSelectedTile')}
            courseName={data.firmChoiceTileDetails.courseName ?? ''}
          />
        )}
        {data.finalDestinationTileDetails && (
          <TileDetail
            title={t('finalDestinationTile')}
            country={data.finalDestinationTileDetails.countryName ?? ''}
            university={data.finalDestinationTileDetails.universityName ?? t('notYetSelectedTile')}
            courseName={data.finalDestinationTileDetails.courseName ?? ''}
          />
        )}
      </LayoutSectionWrapper>
    </>
  );
};
