/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* component imports */
import { CoreFormElementError, CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreInputElement } from '../core-element/core-input-element.tsx';

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
  validationRules,
  id,
  type,
  label,
  initialValue,
  placeholder,
  isDisabled,
  error,
  intent,
}: CommonInputGroupProps<T>): JSX.Element => {
  return (
    <CoreFormElementGroupWrapper>
      <CoreFormElementLabel
        inputId={id}
        content={label}
      />
      <CoreInputElement
        validationRules={validationRules}
        id={id}
        type={type}
        placeholder={placeholder}
        initialValue={initialValue}
        isDisabled={isDisabled}
        isError={error !== undefined}
        intent={intent}
      />
      {error && <CoreFormElementError message={error} />}
    </CoreFormElementGroupWrapper>
  );
};
