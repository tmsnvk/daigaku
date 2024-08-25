/**
 * @prettier
 */

import { BaseInput } from '@components/base-styles';
import { InputLabel } from '@components/form';

interface ComponentProps {
  readonly fieldId: string;
  readonly label: string;
  readonly type: string;
  readonly defaultValue: string | number;
}

export const DisabledInputField = ({ fieldId, label, type, defaultValue }: ComponentProps) => {
  return (
    <BaseInput $isDisabled={true}>
      <InputLabel
        inputId={fieldId}
        content={label}
      />
      <input
        type={type}
        id={fieldId}
        name={fieldId}
        disabled
        readOnly
        defaultValue={defaultValue}
      />
    </BaseInput>
  );
};
