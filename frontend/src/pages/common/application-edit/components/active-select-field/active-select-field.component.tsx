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

/* component, style imports */
import { CoreInput } from '@common-types';
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* interface, type, enum imports */
import { ApplicationStatusSelectOption } from '@common-types';
import { SelectOptions } from './active-select-field.interfaces';

/**
 * ===============
 * Component {@link ActiveSelectField}
 * ===============
 */

/**
 * Defines the properties of the {@link ActiveSelectField} component.
 *
 * @since 0.0.1
 */
interface ComponentProps<T extends FieldValues> extends CoreInput<T> {
  /**
   * The label text to be displayed above the select input.
   */
  label: string;

  /**
   * The value previously selected by the user, or null if none.
   */
  previouslySelectedValue: ApplicationStatusSelectOption | null;

  /**
   * The prompt text displayed in the select input when no option is selected.
   */
  selectPrompt: string;

  /**
   * An array of options available for selection, of type {@link SelectOptions}.
   */
  options: Array<SelectOptions>;
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
}: ComponentProps<T>): JSX.Element => {
  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        labelText={label}
      />
      <select
        {...register(id)}
        id={id}
        name={id}
        defaultValue={previouslySelectedValue?.uuid}
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
