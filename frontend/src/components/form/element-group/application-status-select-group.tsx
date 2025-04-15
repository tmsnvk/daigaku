/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* component, style imports */
import { CoreFormElementError, CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreSelectElement } from '../core-element/core-select-element';

/* interface, type, enum imports */
import { ApplicationStatusUnion, CoreSelectElementGroup } from '@common-types';

/**
 * Defines the component's properties.
 */
interface ApplicationStatusSelectGroupProps<T extends FieldValues, ApplicationStatusUnion>
  extends CoreSelectElementGroup<T, ApplicationStatusUnion> {
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
export const ApplicationStatusSelectGroup = <T extends FieldValues>({
  validationRules,
  error,
  id,
  label,
  selectPrompt,
  previouslySelectedValue,
  isDisabled,
  options,
  intent,
  onFieldUpdate,
}: ApplicationStatusSelectGroupProps<T, ApplicationStatusUnion>): JSX.Element => {
  const updateField = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
    const target = event.target as HTMLSelectElement | null;

    if (onFieldUpdate !== undefined && target !== null) {
      onFieldUpdate(target.value);
    }
  };

  return (
    <CoreFormElementGroupWrapper>
      <CoreFormElementLabel
        inputId={id}
        content={label}
      />
      <CoreSelectElement
        validationRules={validationRules}
        id={id}
        options={options.map((status: ApplicationStatusUnion) => (
          <option
            key={status.uuid}
            value={status.uuid}
          >
            {status.name}
          </option>
        ))}
        initialValue={previouslySelectedValue?.name}
        defaultOption={selectPrompt}
        isDisabled={isDisabled}
        isError={error !== undefined}
        intent={intent}
        onChangeHandler={updateField}
      />
      {error && <CoreFormElementError message={error} />}
    </CoreFormElementGroupWrapper>
  );
};
