/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* component, style imports */
import { Article } from './application-detail.styles';

/**
 * ===============
 * Component {@link ApplicationDetailsField}
 * ===============
 */

/**
 * Defines the properties of the {@link ApplicationDetail} component.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
 */
export const ApplicationDetail = ({ name, value }: ComponentProps): JSX.Element => {
  return (
    <Article>
      <h2>{name}</h2>
      <p>{value}</p>
    </Article>
  );
};
