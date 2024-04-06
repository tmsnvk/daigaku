import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import {
  ErrorMessage,
  InputFieldStyles,
  InputLabel,
} from '@components/shared/form';

type SelectOptionsT = {
  uuid: string;
  name: string;
}

type ComponentPropsT<T extends FieldValues> = {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  labelContent: string;
  defaultValue: string;
  defaultOptionFieldContent: string;
  options: SelectOptionsT[] | undefined;
}

const GeneralSelectInputField = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  labelContent,
  defaultValue,
  defaultOptionFieldContent,
  options,
}: ComponentPropsT<T>) => {
  return (
    <InputFieldStyles $isError={fieldError !== undefined}>
      <InputLabel inputId={fieldId} content={labelContent} />
      <select
        {...register(fieldId)}
        id={fieldId}
        name={fieldId}
        defaultValue={defaultValue}
      >
        {!defaultValue && <option hidden value={''}>{defaultOptionFieldContent}</option>}
        {options?.map((option: SelectOptionsT) => {
          return <option key={option.uuid} value={option.uuid}>{`${option.name}`}</option>;
        })}
      </select>
      {fieldError && <ErrorMessage content={fieldError} />}
    </InputFieldStyles>
  );
};

export default GeneralSelectInputField;
