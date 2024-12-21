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

/* component, style imports */
import { NewApplicationForm } from './components';

/**
 * ===============
 * Component {@link NewApplication}
 * ===============
 */

/**
 * Renders the {@link NewApplicationForm} form submission page for `student` authorisation users.
 *
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const NewApplication = (): JSX.Element => {
  return (
    <main>
      <NewApplicationForm />
    </main>
  );
};
