/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

const coreLinkVariants = cva(
  joinTw(
    'block flex justify-center items-center h-20 px-10 text-2xl font-bold rounded-xl tracking-widest',
    'focus:outline-2',
    'hover:outline-2  hover:cursor-pointer',
  ),
  {
    variants: {
      intent: {
        light: '',
        dark: 'bg-secondary text-tertiary shadow-(--right-bottom-accent-shadow) hover:outline-accent focus:outline-accent',
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
interface CoreLinkProps extends VariantProps<typeof coreLinkVariants> {
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
 * Renders the default `react-router` Link component used throughout the application.
 *
 * @param {CoreLinkProps} props
 * @return {JSX.Element}
 */
export const CoreLink = ({ target, label, intent, size, className }: CoreLinkProps): JSX.Element => {
  return (
    <Link
      to={target}
      className={joinTw(coreLinkVariants({ intent, size, className }))}
    >
      {label}
    </Link>
  );
};
