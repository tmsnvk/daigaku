/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { Article } from './application-detail.styles';

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
    <Article>
      <h2>{name}</h2>
      <p>{value}</p>
    </Article>
  );
};
