/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* logic imports */
import { TodoList, useTodoList } from './student-layout.hooks';

/* component, style imports */
import { DetailTile, StatTile, TodosView } from '../../components';

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

/* interfaces, types, enums */
interface ComponentProps {
  readonly data: DashboardStatistics;
}

/**
 * @description
 * The component renders the application's dashboard for users with student level authorisation.
 *
 * @param {DashboardStatistics} props.data
 * The object containing the {@link DashboardStatistics} data.
 *
 * @returns {JSX.Element}
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
      <section>
        <StatTile
          title={constants.categories.APPLICATIONS}
          value={data.plannedApplicationsCount}
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
      </section>
      <section>
        <StatTile
          title={constants.categories.DISTINCT_COUNTRIES}
          value={data.distinctCountriesCount}
        />
        <StatTile
          title={constants.categories.DISTINCT_UNIVERSITIES}
          value={data.distinctUniversitiesCount}
        />
      </section>
      <section>
        <StatTile
          title={constants.categories.OFFERS}
          value={data.offersCount}
        />
        {data.firmChoice && (
          <DetailTile
            title={constants.categories.FIRM_CHOICE}
            country={data.firmChoice.country ?? ''}
            university={data.firmChoice.university ?? constants.categories.NOT_YET_SELECTED}
            courseName={data.firmChoice.courseName ?? ''}
          />
        )}
        {data.finalDestination && (
          <DetailTile
            title={constants.categories.FINAL_DESTINATION}
            country={data.finalDestination.country ?? ''}
            university={data.finalDestination.university ?? constants.categories.NOT_YET_SELECTED}
            courseName={data.finalDestination.courseName ?? ''}
          />
        )}
      </section>
    </>
  );
};
