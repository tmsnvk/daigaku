import { InputContainer } from './InputField.styles.ts';

type InputFieldContent = {
  id: string;
  labelContent: string;
  type: string;
  defaultValue?: string;
  placeholder?: string;
}

const InputField = ({ id, labelContent, type, defaultValue, placeholder }: InputFieldContent) => {
  return (
    <InputContainer>
      <label htmlFor={id}>{labelContent}</label>
      <input
        type={type}
        id={id}
        name={id}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder ?? ''}
      />
    </InputContainer>
  );
};

export default InputField;
