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
import { constants } from './page-footer.constants';
import { Footer } from './page-footer.styles';

/* configuration, utilities, constants imports */
import { getCurrentYear } from './page-footer.utilities';

/**
 * ===============
 * Component {@link PageFooter}
 * ===============
 */

/**
 * Renders the footer area of each page.
 *
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const PageFooter = (): JSX.Element => {
  return (
    <>
      <div></div>
      <Footer>
        <p>
          {constants.START_YEAR} - {getCurrentYear()}
        </p>
        <p>{constants.MESSAGE}</p>
      </Footer>
    </>
  );
};
