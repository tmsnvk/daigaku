/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* logic imports */
import { useOnFieldUpdate } from '../hooks';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* interface, type, enum imports */
import { ApplicationStatusUnion, CoreInput } from '@common-types';

/**
 * Defines the component's properties.
 */
interface ActiveSelectFieldProps<T extends FieldValues> extends CoreInput<T> {
  /**
   * The label text to be displayed above the select input.
   */
  readonly label: string;

  /**
   * The value previously selected by the user, or null if none.
   */
  readonly previouslySelectedValue: ApplicationStatusUnion | null;

  /**
   * The prompt text displayed in the select input when no option is selected.
   */
  readonly selectPrompt: string;

  /**
   * An array of options available for selection.
   */
  readonly options: Array<ApplicationStatusUnion>;

  /**
   * A callback function invoked when the field's value is updated.
   */
  onFieldUpdate?: (eventTargetValue: string) => void;
}

/**
 * Renders a `select` input field whose option type is included in the {@link ApplicationStatusUnion} union type.
 *
 * @return {JSX.Element}
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
}: ActiveSelectFieldProps<T>): JSX.Element => {
  const { updateField } = useOnFieldUpdate(onFieldUpdate);

  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        label={label}
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
        {options.map((option: ApplicationStatusUnion) => {
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
