/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

/* component imports */
import { CreateApplicationRecordForm } from './create-application-record-form';

/**
 * Renders the {@link CreateApplicationRecordForm} form submission page for `student` authorisation users.
 *
 * @return {JSX.Element}
 */
export const NewApplication = (): JSX.Element => {
  return (
    <main className={joinTw('flex flex-col items-center', 'mx-auto')}>
      <CreateApplicationRecordForm />
    </main>
  );
};
