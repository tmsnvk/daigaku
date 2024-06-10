import { BaseInputField } from '@components/base-styles';
import { InputLabel } from '@components/form';

type ComponentPropsT = {
  fieldId: string;
  label: string;
  type: string;
  defaultValue: string | number;
}

const DisabledInputField = ({ fieldId, label, type, defaultValue }: ComponentPropsT) => {
  return (
    <BaseInputField $isDisabled={true}>
      <InputLabel inputId={fieldId} content={label} />
      <input
        type={type}
        id={fieldId}
        name={fieldId}
        disabled
        readOnly
        defaultValue={defaultValue}
      />
    </BaseInputField>
  );
};

export default DisabledInputField;
