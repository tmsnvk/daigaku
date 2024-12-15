/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
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
import { FieldUpdate, useOnFieldUpdate } from './active-select-field.hooks';
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

  /**
   * Callback function invoked when the field's value is updated.
   */
  onFieldUpdate?: (eventTargetValue: string) => void;
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
  // Custom hook that updates the field's value.
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
