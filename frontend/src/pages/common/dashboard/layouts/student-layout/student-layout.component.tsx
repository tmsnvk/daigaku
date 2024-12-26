/**
 * @prettier
 */

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
import { constants } from './student-layout.constants';

/* interface, type, enum imports */
import { StudentDashboardStatistics, TodoList } from '@common-types';

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
  const { todos }: TodoList = useTodoList(data);

  return (
    <>
      <TodosView
        introduction={constants.todoList.INTRODUCTION}
        todos={todos}
      />
      <TileUnit>
        <StatTile
          title={constants.tile.APPLICATIONS}
          value={data.applicationsCount}
        />
        <StatTile
          title={constants.tile.PLANNED_APPLICATIONS}
          value={data.plannedApplicationsCount}
        />
        <StatTile
          title={constants.tile.SUBMITTED_APPLICATIONS}
          value={data.submittedApplicationsCount}
        />
        <StatTile
          title={constants.tile.WITHDRAWN_APPLICATIONS}
          value={data.withdrawnStatusCount}
        />
      </TileUnit>
      <TileUnit>
        <StatTile
          title={constants.tile.DISTINCT_COUNTRIES}
          value={data.distinctCountriesCount}
        />
        <StatTile
          title={constants.tile.DISTINCT_UNIVERSITIES}
          value={data.distinctUniversitiesCount}
        />
      </TileUnit>
      <TileUnit>
        <StatTile
          title={constants.tile.OFFERS}
          value={data.offersCount}
        />
        {data.firmChoiceTileDetails && (
          <DetailTile
            title={constants.tile.FIRM_CHOICE}
            country={data.firmChoiceTileDetails.countryName ?? ''}
            university={data.firmChoiceTileDetails.universityName ?? constants.tile.NOT_YET_SELECTED}
            courseName={data.firmChoiceTileDetails.courseName ?? ''}
          />
        )}
        {data.finalDestinationTileDetails && (
          <DetailTile
            title={constants.tile.FINAL_DESTINATION}
            country={data.finalDestinationTileDetails.countryName ?? ''}
            university={data.finalDestinationTileDetails.universityName ?? constants.tile.NOT_YET_SELECTED}
            courseName={data.finalDestinationTileDetails.courseName ?? ''}
          />
        )}
      </TileUnit>
    </>
  );
};
