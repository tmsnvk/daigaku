/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';
import { Link } from 'react-router-dom';

const linkVariants = cva(
  joinTw(
    'block flex justify-center items-center h-20 px-10 text-2xl font-bold rounded-xl uppercase tracking-widest',
    'focus:outline-2 focus:outline-solid',
    'hover:outline-2 hover:outline-solid  cursor-pointer',
  ),
  {
    variants: {
      intent: {
        light: '',
        dark: 'bg-secondary text-tertiary focus:outline-secondary hover:outline-tertiary',
      },
      size: {
        normal: 'w-36',
      },
    },
  },
);

/**
 * Defines the component's properties.
 */
interface BaseLinkProps extends VariantProps<typeof linkVariants> {
  /**
   * The link's target url.
   */
  readonly target: string;

  /**
   * The button's label.
   */
  readonly label: string;

  /**
   * The button's additional style options.
   */
  readonly className?: string;
}

/**
 * Renders the default `react-router` <Link> component used throughout the application.
 *
 * @param {BaseLinkProps} props
 * @return {JSX.Element}
 */
export const BaseLink = ({ target, label, intent, size, className }: BaseLinkProps): JSX.Element => {
  return (
    <Link
      to={target}
      className={joinTw(linkVariants({ intent, size, className }))}
    >
      {label}
    </Link>
  );
};
