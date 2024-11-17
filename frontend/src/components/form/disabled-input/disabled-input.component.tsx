/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputLabel } from '@components/form';

/**
 * ===============
 * Component {@link DisabledInput}
 * ===============
 */

/**
 * Defines the properties of the {@link DisabledInput} component.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
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
