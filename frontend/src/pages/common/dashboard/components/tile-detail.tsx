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
interface TileDetailProps {
  /**
   * The tile's title.
   */
  readonly title: string;

  /**
   * The tile's country value.
   */
  readonly country: string;

  /**
   * The tile's university value.
   */
  readonly university: string;

  /**
   * The tile's courseName value.
   */
  readonly courseName: string;
}

/**
 * Renders a detail tile with a title and corresponding data.
 *
 * @param {TileDetailProps} props
 * @return {JSX.Element}
 */
export const TileDetail = ({ title, country, university, courseName }: TileDetailProps): JSX.Element => {
  return (
    <article className={'base-dark-border size-[22rem] px-5 pb-2 flex flex-col justify-center text-center'}>
      <p className={'font-extrabold text-2xl py-2'}>{country}</p>
      <p className={'font-extrabold text-2xl py-2'}>{university}</p>
      <p className={'font-extrabold text-2xl py-2'}>{courseName}</p>
      <p className={'pt-15 text-3xl'}>{title}</p>
    </article>
  );
};
