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
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const DetailTile = ({ title, country, university, courseName }: ComponentProps): JSX.Element => {
  return (
    <article className={'base-dark-border w-[25rem] h-[25rem] px-[1rem] pb-[2.5rem] flex flex-col justify-center text-center'}>
      <p className={'font-extrabold text-2xl py-[1rem]'}>{country}</p>
      <p className={'font-extrabold text-2xl py-[1rem]'}>{university}</p>
      <p className={'font-extrabold text-2xl py-[1rem]'}>{courseName}</p>
      <p className={'pt-[5rem] text-4xl'}>{title}</p>
    </article>
  );
};
