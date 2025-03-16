/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { joinTw } from '@utilities';

/**
 * Defines the component's properties.
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
export const PageTitle = ({ title, className }: ComponentProps): JSX.Element => {
  return <h1 className={joinTw('form-title-head', className)}>{title}</h1>;
};
