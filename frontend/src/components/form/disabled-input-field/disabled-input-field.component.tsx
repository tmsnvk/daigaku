/**
 * @prettier
 */

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputLabel } from '@components/form';

/* interfaces, types, enums */
interface ComponentProps {
  readonly fieldId: string;
  readonly label: string;
  readonly type: string;
  readonly defaultValue: string | number;
}

/*
 * component - TODO - add functionality description
 */
export const DisabledInputField = ({ fieldId, label, type, defaultValue }: ComponentProps) => {
  return (
    <BaseInput $isDisabled={true}>
      <InputLabel
        id={fieldId}
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
