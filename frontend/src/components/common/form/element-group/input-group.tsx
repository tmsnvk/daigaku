/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { InputHTMLAttributes, JSX } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useFieldValidationError } from '@daigaku/hooks';

/* component imports */
import { CoreElementError } from '../core-element/core-element-error.tsx';
import { CoreInput, CoreInputVariantIntent } from '../core-element/core-input.tsx';
import { CoreLabel } from '../core-element/core-label.tsx';
import { ElementGroupWrapper } from '../form-support/element-group-wrapper.tsx';

/**
 * Defines the component's properties.
 *
 * @template TFormValues - The type of form values extending the `react-hook-form` library.
 */
interface InputGroupProps<TFormValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * The input element's id.
   */
  readonly id: Path<TFormValues>;

  /**
   * The displayed label alongside the input element.
   */
  readonly label: string;

  /**
   * The input element's style intent.
   */
  readonly intent: CoreInputVariantIntent;
}

/**
 * Renders a generic input element group instance integrated with the `react-hook-form` library.
 *
 * @param {InputGroupProps<TFormValues extends FieldValues>} props
 * @return {JSX.Element}
 */
export const InputGroup = <TFormValues extends FieldValues>({
  id,
  type,
  disabled,
  label,
  defaultValue,
  placeholder,
  intent,
}: InputGroupProps<TFormValues>): JSX.Element => {
  const { t } = useTranslation();

  const { error } = useFieldValidationError<TFormValues>(id);

  return (
    <ElementGroupWrapper>
      <CoreLabel
        error={!!error}
        inputId={id}
        label={label}
      />
      <CoreInput
        defaultValue={defaultValue}
        disabled={disabled}
        error={!!error}
        id={id}
        intent={intent}
        placeholder={placeholder}
        type={type}
      />
      {error && error?.message && <CoreElementError message={t(error.message)} />}
    </ElementGroupWrapper>
  );
};
