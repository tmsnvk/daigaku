/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { Footer } from './page-footer.styles';

/* configuration, utilities, constants imports */
import { constants } from './page-footer.constants';
import { getCurrentYear } from './page-footer.utilities';

/**
 * Renders the footer area of a page.
 *
 * @return {JSX.Element}
 */
export const PageFooter = (): JSX.Element => {
  return (
    <>
      <div></div>
      <Footer>
        <p>
          {constants.ui.INIT_YEAR} - {getCurrentYear()}
        </p>
        <p>{constants.ui.INFO}</p>
      </Footer>
    </>
  );
};
