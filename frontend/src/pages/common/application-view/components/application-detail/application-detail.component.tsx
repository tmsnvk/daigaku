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

/* interfaces, types, enums */
interface ComponentProps {
  name: string;
  value: string | number;
}

/**
 * @description
 * The component renders a single value on the {@link ApplicationDetails} form.
 *
 * @param {string} props.name
 * An application detail's name property.
 * @param {string | number} props.value
 * An application detail's value property.
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
