/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { Link } from '@tanstack/react-router';
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX, ReactNode } from 'react';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

const coreLinkVariants = cva(
  joinTw('block flex justify-center items-center font-bold tracking-wider rounded-xl', 'hover:cursor-pointer'),
  {
    variants: {
      intent: {
        light: '',
        table: joinTw(
          'h-10 mx-auto py-4 bg-transparent text-secondary text-xl font-bold tracking-wider cursor-pointer',
          'hover:text-accent',
        ),
        dark: joinTw(
          'h-20 px-10 bg-secondary text-tertiary text-2xl shadow-(--right-bottom-accent-shadow)',
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
   * The link's label.
   */
  readonly label: string | ReactNode;
}

/**
 * Renders the default `react-router` Link component used throughout the application.
 *
 * @param {CoreLinkProps} props
 * @return {JSX.Element}
 */
export const CoreLink = ({ target, label, intent, size }: CoreLinkProps): JSX.Element => {
  return (
    <Link
      className={joinTw(coreLinkVariants({ intent, size }))}
      to={target}
    >
      {label}
    </Link>
  );
};
