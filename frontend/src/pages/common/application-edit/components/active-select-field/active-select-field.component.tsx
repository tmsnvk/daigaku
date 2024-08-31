/**
 * @prettier
 */

/* external imports */
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* logic imports */
import { SelectOptions, useGetPreviouslySelectedValue } from './active-select-field.hooks';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* interfaces, types, enums */
interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldError: string | undefined;
  fieldId: Path<T>;
  labelContent: string;
  previouslySelectedValue: string;
  selectPrompt: string;
  options: Array<SelectOptions>;
  isReadOnly: boolean;
  onFieldUpdate: (eventTargetValue: string) => void;
}

/*
 * component - TODO - add functionality description
 */
export const ActiveSelectField = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  labelContent,
  previouslySelectedValue,
  selectPrompt,
  options,
  isReadOnly,
  onFieldUpdate,
}: ComponentProps<T>) => {
  const previousOption: SelectOptions = useGetPreviouslySelectedValue(options, previouslySelectedValue);

  return (
    <BaseInput $isError={fieldError !== undefined}>
      <InputLabel
        fieldId={fieldId}
        content={labelContent}
      />
      <select
        {...register(fieldId, {
          onChange: (event) => onFieldUpdate(event.target.value),
        })}
        id={fieldId}
        name={fieldId}
        disabled={isReadOnly}
        defaultValue={previousOption?.uuid}
      >
        <option
          hidden
          value={''}
        >
          {selectPrompt}
        </option>
        {options.map((option: SelectOptions) => {
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
      {fieldError && <InputError message={fieldError} />}
    </BaseInput>
  );
};
