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
import { DescriptionList } from './stat-tile.styles';

/**
 * ===============
 * Component {@link StatTile}
 * ===============
 */

/**
 * The interface represents the component's properties.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly title: string;
  readonly value: number;
}

/**
 * @description
 * The component renders a statistic tile with a title and corresponding data.
 *
 * @param {ComponentProps} props
 * @param props.title The tile's title
 * @param props.value The tile's value.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const StatTile = ({ title, value }: ComponentProps): JSX.Element => {
  return (
    <DescriptionList>
      <dt>{value}</dt>
      <dd>{title}</dd>
    </DescriptionList>
  );
};
