/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useTodoList } from '../hooks/use-todo-list';

/* component imports */
import { LayoutSectionWrapper, TileDetail, TileStatistic, TodoList } from '.';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

/* interface, type, enum imports */
import { StudentDashboardStatistics } from '@common-types';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The object containing the {@link StudentDashboardStatistics} data.
   */
  readonly data: StudentDashboardStatistics;
}

/**
 * Renders the application's dashboard for users with Student authorisation.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const LayoutStudent = ({ data }: ComponentProps): JSX.Element => {
  const { todos } = useTodoList(data);

  return (
    <>
      <TodoList
        introduction={l.PAGES.COMMON.DASHBOARD.TODO_LIST.INTRODUCTION}
        todos={todos}
      />
      <LayoutSectionWrapper>
        <TileStatistic
          title={l.PAGES.COMMON.DASHBOARD.TILE.APPLICATIONS}
          value={data.applicationsCount}
        />
        <TileStatistic
          title={l.PAGES.COMMON.DASHBOARD.TILE.PLANNED_APPLICATIONS}
          value={data.plannedApplicationsCount}
        />
        <TileStatistic
          title={l.PAGES.COMMON.DASHBOARD.TILE.SUBMITTED_APPLICATIONS}
          value={data.submittedApplicationsCount}
        />
        <TileStatistic
          title={l.PAGES.COMMON.DASHBOARD.TILE.WITHDRAWN_APPLICATIONS}
          value={data.withdrawnStatusCount}
        />
      </LayoutSectionWrapper>
      <LayoutSectionWrapper>
        <TileStatistic
          title={l.PAGES.COMMON.DASHBOARD.TILE.DISTINCT_COUNTRIES}
          value={data.distinctCountriesCount}
        />
        <TileStatistic
          title={l.PAGES.COMMON.DASHBOARD.TILE.DISTINCT_UNIVERSITIES}
          value={data.distinctUniversitiesCount}
        />
      </LayoutSectionWrapper>
      <LayoutSectionWrapper>
        <TileStatistic
          title={l.PAGES.COMMON.DASHBOARD.TILE.OFFERS}
          value={data.offersCount}
        />
        {data.firmChoiceTileDetails && (
          <TileDetail
            title={l.PAGES.COMMON.DASHBOARD.TILE.FIRM_CHOICE}
            country={data.firmChoiceTileDetails.countryName ?? ''}
            university={data.firmChoiceTileDetails.universityName ?? l.PAGES.COMMON.DASHBOARD.TILE.NOT_YET_SELECTED}
            courseName={data.firmChoiceTileDetails.courseName ?? ''}
          />
        )}
        {data.finalDestinationTileDetails && (
          <TileDetail
            title={l.PAGES.COMMON.DASHBOARD.TILE.FINAL_DESTINATION}
            country={data.finalDestinationTileDetails.countryName ?? ''}
            university={data.finalDestinationTileDetails.universityName ?? l.PAGES.COMMON.DASHBOARD.TILE.NOT_YET_SELECTED}
            courseName={data.finalDestinationTileDetails.courseName ?? ''}
          />
        )}
      </LayoutSectionWrapper>
    </>
  );
};
