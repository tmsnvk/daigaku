/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';
import { getCurrentYear } from '@utilities';

/**
 * Renders the application's footer area.
 *
 * @return {JSX.Element}
 */
export const Footer = (): JSX.Element => {
  return (
    <>
      <div></div>
      <footer className='text-xl h-28 absolute w-full bottom-0 flex flex-col justify-center items-center bg-primary border-t-2 border-secondary'>
        <p>
          {l.LAYOUT.FOOTER.INIT_YEAR} - {getCurrentYear()}
        </p>
        <p>{l.LAYOUT.FOOTER.CONTENT}</p>
      </footer>
    </>
  );
};
