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
import { CoreFormElementError, CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreInputElement } from '../core-element/core-input-element.tsx';

/* interface, type imports */
import { CommonInputElementGroup } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 *
 * @template TFormValues - The type of form values extending the `react-hook-form` library.
 */
interface CommonInputGroupProps<TFormValues extends FieldValues> extends CommonInputElementGroup<TFormValues> {}

/**
 * Renders a generic input element group instance integrated with the `react-hook-form` library.
 *
 * @param {CommonInputGroupProps<TFormValues extends FieldValues>} props
 * @return {JSX.Element}
 */
export const CommonInputGroup = <TFormValues extends FieldValues>({
  id,
  type,
  isDisabled,
  label,
  initialValue,
  placeholder,
  intent,
}: CommonInputGroupProps<TFormValues>): JSX.Element => {
  const { t } = useTranslation();

  const { error } = useFieldValidationError<TFormValues>(id);

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
