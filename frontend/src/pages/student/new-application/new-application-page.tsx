/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { NewApplicationForm } from './components';

/**
 * Renders the {@link NewApplicationForm} form submission page for `student` authorisation users.
 *
 * @return {JSX.Element}
 */
export const NewApplication = (): JSX.Element => {
  return (
    <main className={'mx-auto flex flex-col items-center'}>
      <NewApplicationForm />
    </main>
  );
};
