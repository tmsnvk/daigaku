/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* component imports */
import { CoreFormElementError, CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreInputElement } from '../core-element/core-input-element.tsx';

/* logic imports */
import { useFieldValidationError } from '@daigaku/hooks';

/* interface, type, enum imports */
import { CommonInputElementGroup } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 */
interface CommonInputGroupProps<T extends FieldValues> extends CommonInputElementGroup<T> {}

/**
 * Renders a generic input element group instance integrated with the `react-hook-form` library.
 *
 * @param {CommonInputGroupProps<T extends FieldValues>} props
 * @return {JSX.Element}
 */
export const CommonInputGroup = <T extends FieldValues>({
  id,
  type,
  isDisabled,
  label,
  initialValue,
  placeholder,
  intent,
}: CommonInputGroupProps<T>): JSX.Element => {
  const { t } = useTranslation();

  const { error } = useFieldValidationError<T>(id);

  return (
    <CoreFormElementGroupWrapper>
      <CoreFormElementLabel
        inputId={id}
        label={label}
        isError={!!error}
      />
      <CoreInputElement
        id={id}
        type={type}
        isDisabled={isDisabled}
        isError={!!error}
        placeholder={placeholder}
        initialValue={initialValue}
        intent={intent}
      />
      {error && error?.message && <CoreFormElementError message={t(error.message)} />}
    </CoreFormElementGroupWrapper>
  );
};
