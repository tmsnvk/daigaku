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
interface TileStatisticProps {
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
 * @param {TileStatisticProps} props
 * @return {JSX.Element}
 */
export const TileStatistic = ({ title, value }: TileStatisticProps): JSX.Element => {
  return (
    <dl className={'base-dark-border size-[22rem] px-5 pb-2 flex flex-col justify-center text-center'}>
      <dt className={'text-9xl'}>{value}</dt>
      <dd className={'text-3xl pt-15'}>{title}</dd>
    </dl>
  );
};
