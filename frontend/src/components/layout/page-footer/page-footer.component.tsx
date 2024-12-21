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
          {constants.ui.START_YEAR} - {getCurrentYear()}
        </p>
        <p>{constants.ui.INFO}</p>
      </Footer>
    </>
  );
};
