/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputLabel } from '@components/form';

/**
 * ===============
 * Component {@link DisabledInputField}
 * ===============
 */

/**
 * @interface
 * @description
 * The interface represents the properties of the {@link DisabledInputField} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly fieldId: string;
  readonly label: string;
  readonly type: string;
  readonly value: string | number;
}

/**
 * @component
 * @description
 * The component renders a readonly input field.
 *
 * @param {ComponentProps} props
 * @param props.fieldId The id of the input field.
 * @param props.label The label of the input field.
 * @param props.type The type of the input field.
 * @param props.value The default value of the input field.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const DisabledInputField = ({ fieldId, label, type, value }: ComponentProps): JSX.Element => {
  return (
    <BaseInput $isDisabled={true}>
      <InputLabel
        inputId={fieldId}
        labelText={label}
      />
      <input
        type={type}
        id={fieldId}
        name={fieldId}
        disabled
        readOnly
        defaultValue={value}
      />
    </BaseInput>
  );
};
