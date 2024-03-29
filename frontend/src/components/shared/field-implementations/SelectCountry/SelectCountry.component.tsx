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
import { CountriesT } from '@hooks/useGetCountryOptions.tsx';

type ComponentPropsT<T extends FieldValues> = {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  defaultValue: string;
  isDisabled: boolean;
  data: CountriesT[];
  onCountryClick: (event: string) => void;
  handleCountrySelectionStatus: () => void;
}

const SelectCountry = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  defaultValue,
  isDisabled,
  data,
  onCountryClick,
  handleCountrySelectionStatus,
}: ComponentPropsT<T>) => {
  return (
    <InputFieldStyles $isError={fieldError !== undefined}>
      <InputLabel inputId={fieldId} content={'Country'} />
      <select
        {...register(fieldId, {
          required: {
            value: true,
            message: 'Selecting a country is required.',
          },
          onChange: (event) => {
            onCountryClick(event.target.value);
            handleCountrySelectionStatus();
          },
        })}
        id={fieldId}
        name={fieldId}
        autoComplete={'off'}
        defaultValue={defaultValue}
        disabled={isDisabled}
      >
        <option hidden value={''}>Select the country of your choice.</option>
        {data.map((option: CountriesT) => {
          return <option key={option.uuid} value={option.uuid}>{option.name}</option>;
        })}
      </select>
      {fieldError && <ErrorMessage error={fieldError} />}
    </InputFieldStyles>
  );
};

export default SelectCountry;
