/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';

/* component imports */
import {
  CoreFormElementError,
  CoreFormElementFetchStateWrapper,
  CoreFormElementGroupWrapper,
  CoreFormElementLabel,
} from '..';
import { CoreSelectElement } from '../core-element/core-select-element.tsx';

/* interface, type, enum imports */
import { CoreSelectElementGroup } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 */
interface SupportSelectGroupProps<T extends FieldValues> extends CoreSelectElementGroup<T> {}

/**
 * Renders a support select element group instance integrated with the `react-hook-form` library.
 *
 * @param {SupportSelectGroupProps<T extends FieldValues>} props
 * @return {JSX.Element}
 */
export const SupportSelectGroup = <T extends FieldValues>({
  id,
  isLoading,
  isError,
  isDisabled,
  onRetry,
  label,
  options,
  defaultOption,
  intent,
}: SupportSelectGroupProps<T>): JSX.Element => {
  const { formState } = useFormContext();
  const error = formState.errors[id]?.message;

  return (
    <CoreFormElementFetchStateWrapper
      isLoading={isLoading}
      isError={isError}
      onRetry={onRetry}
    >
      <CoreFormElementGroupWrapper>
        <CoreFormElementLabel
          inputId={id}
          label={label}
        />
        <CoreSelectElement
          id={id}
          options={options}
          defaultOption={defaultOption}
          isDisabled={isDisabled}
          isError={error !== undefined}
          intent={intent}
        />
        {error && <CoreFormElementError message={error as string} />}
      </CoreFormElementGroupWrapper>
    </CoreFormElementFetchStateWrapper>
  );
};
