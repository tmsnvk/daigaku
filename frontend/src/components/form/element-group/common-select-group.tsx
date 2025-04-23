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
interface CommonSelectGroupProps<T extends FieldValues> extends CoreSelectElementGroup<T> {}

/**
 * Renders a generic select element group instance integrated with the `react-hook-form` library.
 *
 * @param {CommonSelectGrouppProps<T extends FieldValues>} props
 * @return {JSX.Element}
 */
export const CommonSelectGroup = <T extends FieldValues>({
  id,
  isLoading,
  isError,
  isDisabled,
  onRetry,
  onChangeHandler,
  label,
  options,
  initialValue,
  intent,
}: CommonSelectGroupProps<T>): JSX.Element => {
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
          isDisabled={isDisabled}
          isError={error !== undefined}
          onChangeHandler={onChangeHandler}
          options={options}
          initialValue={initialValue}
          intent={intent}
        />
        {error && <CoreFormElementError message={error as string} />}
      </CoreFormElementGroupWrapper>
    </CoreFormElementFetchStateWrapper>
  );
};
