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

/* external imports */
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* logic imports */
import { SelectOptions, useGetPreviouslySelectedValue } from './active-select-field.hooks';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/**
 * ===============
 * Component {@link ActiveSelectField}
 * ===============
 */

/* interfaces, types, enums */
interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldError: string | undefined;
  id: Path<T>;
  label: string;
  previouslySelectedValue: string | null;
  selectPrompt: string;
  options: Array<SelectOptions>;
  isReadOnly: boolean;
  onFieldUpdate: (eventTargetValue: string) => void;
}

/**
 * @description
 * The component renders `select` input fields whose input type is included in the {@link SelectOptions} union type.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const ActiveSelectField = <T extends FieldValues>({
  register,
  fieldError,
  id,
  label,
  previouslySelectedValue,
  selectPrompt,
  options,
  isReadOnly,
  onFieldUpdate,
}: ComponentProps<T>): JSX.Element => {
  const previousOption: SelectOptions | null = useGetPreviouslySelectedValue(options, previouslySelectedValue);

  return (
    <BaseInput $isError={fieldError !== undefined}>
      <InputLabel
        fieldId={id}
        content={label}
      />
      <select
        {...register(id, {
          onChange: (event: Event) => {
            const target = event.target as HTMLSelectElement | null;

            if (target) {
              onFieldUpdate(target.value);
            }
          },
        })}
        id={id}
        name={id}
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
      {fieldError && <InputError errorText={fieldError} />}
    </BaseInput>
  );
};
