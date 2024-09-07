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
import { DescriptionList } from './stat-tile.styles.ts';

/**
 * ===============
 * Component {@link StatTile}
 * ===============
 */

/* interfaces, types, enums */
interface ComponentProps {
  readonly title: string;
  readonly value: number;
}

/**
 * @description
 * The component renders a statistic tile with a title and corresponding data.
 *
 * @param {string} props.title - The tile's title
 * @param {number} props.value - The tile's value.
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
