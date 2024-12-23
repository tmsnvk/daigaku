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
 * Defines the properties of the {@link ApplicationDetail} component.
 */
interface ComponentProps {
  /**
   * The name of the application detail to be displayed.
   */
  name: string;

  /**
   * The value associated with the application detail.
   */
  value: string | number;
}

/**
 * Renders an application detail on the {@link ApplicationDetails} form.
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
