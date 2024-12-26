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
import { DescriptionList } from './stat-tile.styles';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The tile's title.
   */
  readonly title: string;

  /**
   * The tile's value.
   */
  readonly value: number;
}

/**
 * Renders a statistic tile with a title and its corresponding data.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const StatTile = ({ title, value }: ComponentProps): JSX.Element => {
  return (
    <DescriptionList>
      <dt>{value}</dt>
      <dd>{title}</dd>
    </DescriptionList>
  );
};
