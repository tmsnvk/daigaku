/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
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
 * Renders an application detail on the view page of an Application record.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const ApplicationDetail = ({ name, value }: ComponentProps): JSX.Element => {
  return (
    <article className={'col-start-1 col-end-3 flex flex-col items-center'}>
      <h2 className={'text-5xl'}>{name}</h2>
      <p className={'text-3xl'}>{value}</p>
    </article>
  );
};
