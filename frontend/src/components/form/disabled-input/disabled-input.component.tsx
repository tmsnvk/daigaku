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
import { BaseInput } from '@components/base-styles';
import { InputLabel } from '@components/form';

/**
 * Defines the properties of the {@link DisabledInput} component.
 */
interface ComponentProps {
  /**
   * Input id.
   */
  readonly id: string;

  /**
   * Input label text.
   */
  readonly label: string;

  /**
   * Input type, e.g. 'text', 'email', 'number', etc.
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
        labelText={label}
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
