/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* component, style imports */
import { Article } from './application-detail.styles';

/**
 * ===============
 * Component {@link ApplicationDetailsField}
 * ===============
 */

/**
 * The interface represents the properties of the {@link ApplicationDetail} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  name: string;
  value: string | number;
}

/**
 * The component renders a single value on the {@link ApplicationDetails} form.
 *
 * @param {ComponentProps} props
 * @param props.name An application detail's name property.
 * @param props.value An application detail's value property.
 *
 * @returns {JSX.Element}
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
