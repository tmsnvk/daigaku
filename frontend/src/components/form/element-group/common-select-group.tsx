/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useFieldValidationError } from '@daigaku/hooks';

/* component imports */
import {
  CoreFormElementError,
  CoreFormElementFetchStateWrapper,
  CoreFormElementGroupWrapper,
  CoreFormElementLabel,
} from '..';
import { CoreSelectElement } from '../core-element/core-select-element.tsx';

/* interface, type, enum, schema imports */
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
 * @param {CommonSelectGroupProps<T extends FieldValues>} props
 * @return {JSX.Element}
 */
export const CommonSelectGroup = <T extends FieldValues>({
  id,
  isLoading,
  isFetchError,
  isDisabled,
  onRetry,
  onChangeHandler,
  label,
  options,
  initialValue,
  intent,
}: CommonSelectGroupProps<T>): JSX.Element => {
  const { t } = useTranslation();

  const { error } = useFieldValidationError<T>(id);

  return (
    <CoreFormElementFetchStateWrapper
      isLoading={isLoading}
      isError={isFetchError}
      onRetry={onRetry}
    >
      <CoreFormElementGroupWrapper>
        <CoreFormElementLabel
          inputId={id}
          label={label}
          isError={!!error}
        />
        <CoreSelectElement
          id={id}
          isDisabled={isDisabled}
          isError={!!error}
          onChangeHandler={onChangeHandler}
          options={options}
          initialValue={initialValue}
          intent={intent}
        />
        {error && error?.message && <CoreFormElementError message={t(error.message)} />}
      </CoreFormElementGroupWrapper>
    </CoreFormElementFetchStateWrapper>
  );
};
