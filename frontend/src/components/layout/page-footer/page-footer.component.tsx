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
import { localization as l } from '@constants';
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
          {l.LAYOUT.FOOTER.INIT_YEAR} - {getCurrentYear()}
        </p>
        <p>{l.LAYOUT.FOOTER.CONTENT}</p>
      </Footer>
    </>
  );
};
