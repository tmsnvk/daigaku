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

/* component, style imports */
import { NewApplicationForm } from './components';

/* interface, type, enum imports */

/**
 * ===============
 * Component {@link NewApplication}
 * ===============
 */

/**
 * @description
 * The page-level component renders the new application form submission page for `student` authorisation users.
 *
 * @returns {JSX.Element}
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
