/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputLabel } from '@components/form';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The input's id.
   */
  readonly id: string;

  /**
   * The input's label.
   */
  readonly label: string;

  /**
   * The input's type, e.g. 'text', 'email', 'number', etc.
   */
  readonly type: string;

  /**
   * The input's readonly value.
   */
  readonly value: string | number;
}

/**
 * Renders a disabled, readonly input.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const DisabledInput = ({ id, label, type, value }: ComponentProps): JSX.Element => {
  return (
    <BaseInput $isDisabled={true}>
      <InputLabel
        inputId={id}
        label={label}
      />
      <input
        type={type}
        id={id}
        name={id}
        disabled
        readOnly
        defaultValue={value}
      />
    </BaseInput>
  );
};
