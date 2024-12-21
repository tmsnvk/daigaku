/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { JSX } from 'react';

/* component, style imports */
import { Article } from './detail-tile.styles';

/**
 * ===============
 * Component {@link DetailTile}
 * ===============
 */

/**
 * Defines the component's properties.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
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
