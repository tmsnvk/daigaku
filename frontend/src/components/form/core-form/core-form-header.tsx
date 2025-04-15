/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { VariantProps, cva } from 'class-variance-authority';
import { JSX, ReactElement } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

const coreFormHeaderVariants = cva(joinTw('text-center'), {
  variants: {
    intent: {
      small: 'mb-20 text-2xl',
      large: 'text-5xl font-bold',
      largeWithUnderline: 'text-5xl core-form-header-after',
    },
  },
});

/**
 * Defines the component's properties.
 */
interface CoreFormHeaderProps extends VariantProps<typeof coreFormHeaderVariants> {
  /**
   * The form element's title.
   */
  readonly title: string | ReactElement;

  /**
   * Optional style settings.
   */
  readonly className?: string;
}

/**
 * Renders a form element's header title.
 *
 * @param {CoreFormHeaderProps}
 * @returns {JSX.Element}
 */
export const CoreFormHeader = ({ title, intent, className }: CoreFormHeaderProps): JSX.Element => {
  return <h1 className={joinTw(coreFormHeaderVariants({ intent, className }))}>{title}</h1>;
};
