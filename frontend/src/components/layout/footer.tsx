/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';
import { getCurrentYear, joinTw } from '@daigaku/utilities';

/**
 * Renders the application's footer area.
 *
 * @return {JSX.Element}
 */
export const Footer = (): JSX.Element => {
  return (
    <>
      <div></div>
      <footer
        className={joinTw(
          'flex flex-col items-center justify-center',
          'absolute bottom-0 h-28 w-full',
          'bg-primary border-secondary border-t-2 text-xl',
        )}
      >
        <p>
          {l.LAYOUT.FOOTER.INIT_YEAR} - {getCurrentYear()}
        </p>
        <p>{l.LAYOUT.FOOTER.CONTENT}</p>
      </footer>
    </>
  );
};
