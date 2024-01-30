import { InputFieldContainer } from '@components/shared/form';

type ComponentProps = {
  id: string;
  labelContent: string;
  type: string;
  defaultValue?: string;
  placeholder?: string;
}

const GenericInputField = ({ id, labelContent, type, defaultValue, placeholder }: ComponentProps) => {
  return (
    <InputFieldContainer>
      <label htmlFor={id}>{labelContent}</label>
      <input
        type={type}
        id={id}
        name={id}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder ?? ''}
      />
    </InputFieldContainer>
  );
};

export default GenericInputField;
