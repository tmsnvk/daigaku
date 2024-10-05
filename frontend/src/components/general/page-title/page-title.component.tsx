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

/* interfaces, types, enums */
interface ComponentProps {
  readonly title: string;
}

/**
 * @description
 * A component that renders a h1 html element as the given page's title.
 *
 * @param {ComponentProps} props
 * @param props.title The title to be displayed on the page layout.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const PageTitle = ({ title }: ComponentProps): JSX.Element => {
  return <TitleHeading>{title}</TitleHeading>;
};
