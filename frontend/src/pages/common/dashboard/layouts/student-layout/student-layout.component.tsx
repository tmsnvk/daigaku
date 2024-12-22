/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { JSX } from 'react';

/* logic imports */
import { TodoList, useTodoList } from './student-layout.hooks';

/* component, style imports */
import { DetailTile, StatTile, TodosView } from '../../components';
import { TileUnit } from './student-layout.styles';

/* configuration, utilities, constants imports */
import { constants } from '../../dashboard.constants';
import { introduction } from './student-layout.utilities';

/* interface, type, enum imports */
import { DashboardStatistics } from '../../dashboard.hooks';

/**
 * ===============
 * Component {@link StudentLayout}
 * ===============
 */

/**
 * Defines the component's properties.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * The object containing the {@link DashboardStatistics} data.
   */
  readonly data: DashboardStatistics;
}

/**
 * Renders the application's dashboard for users with student level authorisation.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const StudentLayout = ({ data }: ComponentProps): JSX.Element => {
  const { todos }: TodoList = useTodoList(data);

  return (
    <>
      <TodosView
        introduction={introduction}
        todos={todos}
      />
      <TileUnit>
        <StatTile
          title={constants.categories.APPLICATIONS}
          value={data.applicationsCount}
        />
        <StatTile
          title={constants.categories.PLANNED_APPLICATIONS}
          value={data.plannedApplicationsCount}
        />
        <StatTile
          title={constants.categories.SUBMITTED_APPLICATIONS}
          value={data.submittedApplicationsCount}
        />
        <StatTile
          title={constants.categories.WITHDRAWN_APPLICATIONS}
          value={data.withdrawnStatusCount}
        />
      </TileUnit>
      <TileUnit>
        <StatTile
          title={constants.categories.DISTINCT_COUNTRIES}
          value={data.distinctCountriesCount}
        />
        <StatTile
          title={constants.categories.DISTINCT_UNIVERSITIES}
          value={data.distinctUniversitiesCount}
        />
      </TileUnit>
      <TileUnit>
        <StatTile
          title={constants.categories.OFFERS}
          value={data.offersCount}
        />
        {data.firmChoiceTileDetails && (
          <DetailTile
            title={constants.categories.FIRM_CHOICE}
            country={data.firmChoiceTileDetails.countryName ?? ''}
            university={data.firmChoiceTileDetails.universityName ?? constants.categories.NOT_YET_SELECTED}
            courseName={data.firmChoiceTileDetails.courseName ?? ''}
          />
        )}
        {data.finalDestinationTileDetails && (
          <DetailTile
            title={constants.categories.FINAL_DESTINATION}
            country={data.finalDestinationTileDetails.countryName ?? ''}
            university={data.finalDestinationTileDetails.universityName ?? constants.categories.NOT_YET_SELECTED}
            courseName={data.finalDestinationTileDetails.courseName ?? ''}
          />
        )}
      </TileUnit>
    </>
  );
};
