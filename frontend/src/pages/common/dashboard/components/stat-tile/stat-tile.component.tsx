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
    <dl className={'base-dark-border w-[25rem] h-[25rem] px-[1rem] pb-[2.5rem] flex flex-col justify-center text-center'}>
      <dt className={'text-[12rem]'}>{value}</dt>
      <dd className={'text-3xl'}>{title}</dd>
    </dl>
  );
};
