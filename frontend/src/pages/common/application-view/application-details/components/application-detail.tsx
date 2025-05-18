/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Defines the component's properties.
 */
interface ApplicationDetailProps {
  /**
   * The name of the application detail to be displayed.
   */
  readonly name: string;

  /**
   * The value associated with the application detail.
   */
  readonly value: string | number;
}

/**
 * Renders an application detail on the view page of an application record.
 *
 * @param {ApplicationDetailProps} props
 * @return {JSX.Element}
 */
export const ApplicationDetail = ({ name, value }: ApplicationDetailProps): JSX.Element => {
  return (
    <article className={'col-start-1 col-end-3 flex flex-col items-center'}>
      <h2 className={'text-5xl font-bold'}>{name}</h2>
      <p className={joinTw('mt-4', 'text-3xl')}>{value}</p>
    </article>
  );
};
