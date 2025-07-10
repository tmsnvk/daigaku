/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { UpdateApplicationForm } from './update-application-form';

/* interface, type imports */
import { Application } from '@daigaku/common-types';

/**
 *
 */
interface ApplicationsEditProps {
  application: Application;
}

/**
 *
 * @returns {JSX.Element}
 */
export const ApplicationsEdit = ({ application }: ApplicationsEditProps): JSX.Element => {
  return (
    <main className={'mx-auto flex flex-col items-center'}>
      <UpdateApplicationForm application={application} />
    </main>
  );
};
