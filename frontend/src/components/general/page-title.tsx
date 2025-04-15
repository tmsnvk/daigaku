/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

/**
 * Defines the component's properties.
 */
interface PageTitleProps {
  /**
   * The title to be displayed on the page layout.
   */
  readonly title: string;

  /**
   *
   */
  readonly className?: string;
}

/**
 * Renders an h1 HTML element as a page's title.
 *
 * @param {PageTitleProps} props
 * @return {JSX.Element}
 */
export const PageTitle = ({ title, className }: PageTitleProps): JSX.Element => {
  return <h1 className={joinTw('form-title-head', className)}>{title}</h1>;
};
