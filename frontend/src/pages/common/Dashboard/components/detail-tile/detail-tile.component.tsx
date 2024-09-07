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
import { Article } from './detail-tile.styles';

/**
 * ===============
 * Component {@link DetailTile}
 * ===============
 */

/* interfaces, types, enums */
interface ComponentProps {
  readonly title: string;
  readonly country: string;
  readonly university: string;
  readonly courseName: string;
}

/**
 * @description
 * The component renders a detail tile with a title and corresponding data.
 *
 * @param {string} props.title - The tile's title.
 * @param {string} props.country - The tile's country value.
 * @param {string} props.university - The tile's university value.
 * @param {number} props.courseName - The tile's courseName value.
 *
 * @returns {JSX.Element}
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
