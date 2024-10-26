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
import { FieldValues } from 'react-hook-form';

/* logic imports */
import { FieldUpdate, SelectOptions, useGetPreviouslySelectedValue, useOnFieldUpdate } from './active-select-field.hooks';

/* component, style imports */
import { CoreInput } from '@common-types';
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/**
 * ===============
 * Component {@link ActiveSelectField}
 * ===============
 */

/**
 * Represents the properties of the {@link ActiveSelectField} component.
 *
 * @since 0.0.1
 */
interface ComponentProps<T extends FieldValues> extends CoreInput<T> {
  label: string;
  previouslySelectedValue: string | null;
  selectPrompt: string;
  options: Array<SelectOptions>;
  onFieldUpdate: (eventTargetValue: string) => void;
}

/**
 * Renders a `select` input field whose input type is included in the {@link SelectOptions} union type.
 *
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const ActiveSelectField = <T extends FieldValues>({
  register,
  error,
  id,
  label,
  previouslySelectedValue,
  selectPrompt,
  options,
  isDisabled,
  onFieldUpdate,
}: ComponentProps<T>): JSX.Element => {
  const previousOption: SelectOptions | null = useGetPreviouslySelectedValue(options, previouslySelectedValue);
  const { updateField }: FieldUpdate = useOnFieldUpdate(onFieldUpdate);

  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        labelText={label}
      />
      <select
        {...register(id, {
          onChange: (event: Event) => updateField(event),
        })}
        id={id}
        name={id}
        disabled={isDisabled}
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
      {error && <InputError message={error} />}
    </BaseInput>
  );
};
