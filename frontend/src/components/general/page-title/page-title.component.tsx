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
import { TitleHeading } from './page-title.styles.ts';

/**
 * ===============
 * Component {@link PageTitle}
 * ===============
 */

/**
 * Defines the properties of the {@link PageTitle} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * The title to be displayed on the page layout.
   */
  readonly title: string;
}

/**
 * Renders an h1 HTML element as the given page's title.
 *
 * @param {ComponentProps} props
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const PageTitle = ({ title }: ComponentProps): JSX.Element => {
  return <TitleHeading>{title}</TitleHeading>;
};
