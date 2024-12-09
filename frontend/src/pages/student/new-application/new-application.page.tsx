/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

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
