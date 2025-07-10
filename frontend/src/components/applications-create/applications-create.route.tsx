/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { CreateApplicationRecordForm } from './create-application-record-form';

/* interface, type imports */
import { CountryOption } from '@daigaku/common-types';

/**
 *
 */
interface ApplicationsCreateProps {
  /**
   *
   */
  readonly countryOptions: Array<CountryOption>;
}

/**
 *
 * @returns {JSX.Element}
 */
export const ApplicationsCreate = ({ countryOptions }: ApplicationsCreateProps): JSX.Element => {
  return (
    <main className={'mx-auto flex flex-col items-center'}>
      <CreateApplicationRecordForm countryOptions={countryOptions} />
    </main>
  );
};
