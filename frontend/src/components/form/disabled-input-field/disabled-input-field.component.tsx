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

/* interfaces, types, enums */
interface ComponentProps {
  readonly fieldId: string;
  readonly label: string;
  readonly type: string;
  readonly value: string | number;
}

/**
 * @description
 * The component renders a readonly input field.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const DisabledInputField = ({ fieldId, label, type, value }: ComponentProps): JSX.Element => {
  return (
    <BaseInput $isDisabled={true}>
      <InputLabel
        fieldId={fieldId}
        content={label}
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
