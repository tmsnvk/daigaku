/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';
import { getCurrentYear } from '@daigaku/utilities';

/**
 * Renders the application's footer area.
 *
 * @return {JSX.Element}
 */
export const Footer = (): JSX.Element => {
  return (
    <>
      <div></div>
      <footer className='bg-primary border-secondary absolute bottom-0 flex h-28 w-full flex-col items-center justify-center border-t-2 text-xl'>
        <p>
          {l.LAYOUT.FOOTER.INIT_YEAR} - {getCurrentYear()}
        </p>
        <p>{l.LAYOUT.FOOTER.CONTENT}</p>
      </footer>
    </>
  );
};
