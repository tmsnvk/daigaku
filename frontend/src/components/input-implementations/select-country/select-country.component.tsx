import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import { BaseInput } from '@components/base-styles';
import {
  InputError,
  InputLabel,
} from '@components/form';

import { CountryOption } from '@services/support/country.service';

interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  isDisabled: boolean;
  data: Array<CountryOption>;
  onCountryClick: (event: string) => void;
  onCountrySelection: () => void;
}

const SelectCountry = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  isDisabled,
  data,
  onCountryClick,
  onCountrySelection,
}: ComponentProps<T>) => {
  return (
    <BaseInput
      $isError={fieldError !== undefined}
    >
      <InputLabel
        inputId={fieldId}
        content={'Country'}
      />
      <select
        {...register(fieldId, {
          required: {
            value: true,
            message: 'Selecting a country is required.',
          },
          onChange: (event) => {
            onCountryClick(event.target.value);
            onCountrySelection();
          },
        })}
        id={fieldId}
        name={fieldId}
        disabled={isDisabled}
      >
        <option
          hidden
          value={''}
        >
          Select the country of your choice.
        </option>
        {data.map((option: CountryOption) => {
          return (
            <option
              key={option.uuid}
              value={option.uuid}
            >
              {option.name}
            </option>
          );
        })}
      </select>
      {fieldError && <InputError content={fieldError} />}
    </BaseInput>
  );
};

export default SelectCountry;
