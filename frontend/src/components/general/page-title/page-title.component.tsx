/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { TitleHeading } from './page-title.styles.ts';

/**
 * Defines the properties of the {@link PageTitle} component.
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
 * @return {JSX.Element}
 */
export const PageTitle = ({ title }: ComponentProps): JSX.Element => {
  return <TitleHeading>{title}</TitleHeading>;
};
