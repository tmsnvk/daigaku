/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

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
    <dl className={joinTw('core-primary-border', 'flex flex-col justify-center text-center', 'size-88', 'px-5 pb-2')}>
      <dt className={joinTw('text-9xl')}>{value}</dt>
      <dd className={joinTw('pt-15', 'text-3xl')}>{title}</dd>
    </dl>
  );
};
