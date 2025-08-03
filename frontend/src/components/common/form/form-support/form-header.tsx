/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { VariantProps, cva } from 'class-variance-authority';
import { JSX, ReactElement } from 'react';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

const FormHeaderVariants = cva('text-center', {
  variants: {
    intent: {
      small: 'mb-20 text-2xl',
      large: 'text-5xl font-bold',
      largeWithUnderline: 'core-form-header-after text-5xl',
    },
  },
});

/**
 * Defines the component's properties.
 */
interface FormHeaderProps extends VariantProps<typeof FormHeaderVariants> {
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
 * @param {FormHeaderProps}
 * @returns {JSX.Element}
 */
export const FormHeader = ({ title, intent, className }: FormHeaderProps): JSX.Element => {
  return <h1 className={joinTw(FormHeaderVariants({ intent, className }))}>{title}</h1>;
};
