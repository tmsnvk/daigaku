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
 * Defines the component's properties.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * The tile's title
   */
  readonly title: string;

  /**
   * The tile's value.
   */
  readonly value: number;
}

/**
 * Renders a statistic tile with a title and corresponding data.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
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
