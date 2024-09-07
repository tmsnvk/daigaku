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
import { FigureInfoBox, TextInfoBox, TodosView } from '../../components';

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
 * @param {DashboardStatistics} props.data - The object containing the {@link DashboardStatistics} data.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const StudentLayout = ({ data }: ComponentProps): JSX.Element => {
  const { todos }: TodoList = useTodoList(data);

  return (
    <>
      <TodosView introduction={introduction} todos={todos} />
      <section>
        <FigureInfoBox
          title={constants.categories.APPLICATIONS}
          content={data.numberOfApplications}
        />
        <FigureInfoBox
          title={constants.categories.PLANNED_APPLICATIONS}
          content={data.numberOfPlannedStatus}
        />
        <FigureInfoBox
          title={constants.categories.SUBMITTED_APPLICATIONS}
          content={data.numberOfSubmittedStatus}
        />
        <FigureInfoBox
          title={constants.categories.WITHDRAWN_APPLICATIONS}
          content={data.numberOfWithdrawnStatus}
        />
      </section>
      <section>
        <FigureInfoBox
          title={constants.categories.DISTINCT_COUNTRIES}
          content={data.numberOfDifferentCountries}
        />
        <FigureInfoBox
          title={constants.categories.DISTINCT_UNIVERSITIES}
          content={data.numberOfDifferentUniversities}
        />
      </section>
      <section>
        <FigureInfoBox
          title={constants.categories.OFFERS}
          content={data.numberOfOffers}
        />
        {data.firmChoice && (
          <TextInfoBox
            title={constants.categories.FIRM_CHOICE}
            country={data.firmChoice.country ?? ''}
            university={data.firmChoice.university ?? constants.categories.NOT_YET_SELECTED}
            courseName={data.firmChoice.courseName ?? ''}
          />
        )}
        {data.finalDestination && (
          <TextInfoBox
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
