/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useTodoList } from '../hooks/use-todo-list';

/* component imports */
import { LayoutSectionWrapper } from './layout-section-wrapper';
import { TileDetail } from './tile-detail';
import { TileStatistic } from './tile-statistic';
import { TodoList } from './todo-list';

/* interface, type, enum imports */
import { StudentDashboardStatisticsResponse } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface LayoutStudentProps {
  /**
   * The object containing the {@link StudentDashboardStatisticsResponse} data.
   */
  readonly data: StudentDashboardStatisticsResponse;
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
