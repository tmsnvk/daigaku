/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX, ReactNode } from 'react';
import { Link } from 'react-router-dom';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

const coreLinkVariants = cva(
  joinTw('block flex justify-center items-center', 'font-bold tracking-wider', 'rounded-xl', 'hover:cursor-pointer'),
  {
    variants: {
      intent: {
        light: '',
        table: joinTw(
          'h-10',
          'mx-auto py-4',
          'bg-transparent',
          'text-secondary text-xl font-bold tracking-wider',
          'cursor-pointer',
          'hover:text-accent',
        ),
        dark: joinTw(
          'h-20 px-10',
          'bg-secondary',
          'text-tertiary text-2xl',
          'shadow-(--right-bottom-accent-shadow)',
          'hover:outline-accent hover:outline-2',
          'focus:outline-accent focus:outline-2',
        ),
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
   *
   */
  readonly state?: unknown;

  /**
   * The button's label.
   */
  readonly label: string | ReactNode;
}

/**
 * Renders the default `react-router` Link component used throughout the application.
 *
 * @param {CoreLinkProps} props
 * @return {JSX.Element}
 */
export const CoreLink = ({ target, state, label, intent, size }: CoreLinkProps): JSX.Element => {
  return (
    <Link
      to={target}
      state={state}
      className={joinTw(coreLinkVariants({ intent, size }))}
    >
      {label}
    </Link>
  );
};
