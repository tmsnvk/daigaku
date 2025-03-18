/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { NewApplicationForm } from './components';

/**
 * Renders the {@link NewApplicationForm} form submission page for `student` authorisation users.
 *
 * @return {JSX.Element}
 */
export const NewApplication = (): JSX.Element => {
  return (
    <main>
      <NewApplicationForm />
    </main>
  );
};
