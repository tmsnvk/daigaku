/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useTodoList } from './student-layout.hooks';

/* component, style imports */
import { DetailTile, StatTile, TodosView } from '../../components';
import { TileUnit } from './student-layout.styles';

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
 * Renders the application's dashboard for users with student level authorisation.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const StudentLayout = ({ data }: ComponentProps): JSX.Element => {
  const { todos } = useTodoList(data);

  return (
    <>
      <TodosView
        introduction={l.PAGES.COMMON.DASHBOARD.TODO_LIST.INTRODUCTION}
        todos={todos}
      />
      <TileUnit>
        <StatTile
          title={l.PAGES.COMMON.DASHBOARD.TILE.APPLICATIONS}
          value={data.applicationsCount}
        />
        <StatTile
          title={l.PAGES.COMMON.DASHBOARD.TILE.PLANNED_APPLICATIONS}
          value={data.plannedApplicationsCount}
        />
        <StatTile
          title={l.PAGES.COMMON.DASHBOARD.TILE.SUBMITTED_APPLICATIONS}
          value={data.submittedApplicationsCount}
        />
        <StatTile
          title={l.PAGES.COMMON.DASHBOARD.TILE.WITHDRAWN_APPLICATIONS}
          value={data.withdrawnStatusCount}
        />
      </TileUnit>
      <TileUnit>
        <StatTile
          title={l.PAGES.COMMON.DASHBOARD.TILE.DISTINCT_COUNTRIES}
          value={data.distinctCountriesCount}
        />
        <StatTile
          title={l.PAGES.COMMON.DASHBOARD.TILE.DISTINCT_UNIVERSITIES}
          value={data.distinctUniversitiesCount}
        />
      </TileUnit>
      <TileUnit>
        <StatTile
          title={l.PAGES.COMMON.DASHBOARD.TILE.OFFERS}
          value={data.offersCount}
        />
        {data.firmChoiceTileDetails && (
          <DetailTile
            title={l.PAGES.COMMON.DASHBOARD.TILE.FIRM_CHOICE}
            country={data.firmChoiceTileDetails.countryName ?? ''}
            university={data.firmChoiceTileDetails.universityName ?? l.PAGES.COMMON.DASHBOARD.TILE.NOT_YET_SELECTED}
            courseName={data.firmChoiceTileDetails.courseName ?? ''}
          />
        )}
        {data.finalDestinationTileDetails && (
          <DetailTile
            title={l.PAGES.COMMON.DASHBOARD.TILE.FINAL_DESTINATION}
            country={data.finalDestinationTileDetails.countryName ?? ''}
            university={data.finalDestinationTileDetails.universityName ?? l.PAGES.COMMON.DASHBOARD.TILE.NOT_YET_SELECTED}
            courseName={data.finalDestinationTileDetails.courseName ?? ''}
          />
        )}
      </TileUnit>
    </>
  );
};
