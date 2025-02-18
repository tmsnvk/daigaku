/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { Article } from './detail-tile.styles';

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
    <Article>
      <p>{country}</p>
      <p>{university}</p>
      <p>{courseName}</p>
      <p>{title}</p>
    </Article>
  );
};
