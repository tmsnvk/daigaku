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
    <article className={'core-primary-border size-88 flex flex-col justify-center px-5 pb-2 text-center'}>
      <p className={'py-2 text-2xl font-extrabold'}>{country}</p>
      <p className={'py-2 text-2xl font-extrabold'}>{university}</p>
      <p className={'py-2 text-2xl font-extrabold'}>{courseName}</p>
      <p className={'pt-15 text-3xl'}>{title}</p>
    </article>
  );
};
