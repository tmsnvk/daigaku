/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { CreateApplicationRecordForm } from './components';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

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
