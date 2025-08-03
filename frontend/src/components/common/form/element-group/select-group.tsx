/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, ReactNode, SelectHTMLAttributes } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useFieldValidationError } from '@daigaku/hooks';

/* component imports */
import { CoreElementError } from '../core-element/core-element-error.tsx';
import { CoreLabel } from '../core-element/core-label.tsx';
import { CoreSelect, CoreSelectVariantIntent } from '../core-element/core-select.tsx';
import { ElementGroupWrapper } from '../form-support/element-group-wrapper.tsx';

/**
 * Defines the component's properties.
 *
 * @template TFormValues - The type of form values extending the `react-hook-form` library.
 */
interface SelectGroupProps<TFormValues extends FieldValues> extends SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * The input element's id.
   */
  readonly id: Path<TFormValues>;

  /**
   *
   */
  readonly label: string;

  /**
   * An array of options available for selection in the select element.
   */
  readonly options: ReactNode;

  /**
   * The input element's style intent.
   */
  readonly intent: CoreSelectVariantIntent;
}

/**
 * Renders a generic select element group instance integrated with the `react-hook-form` library.
 *
 * @param {SelectGroupProps<TFormValues extends FieldValues>} props
 * @return {JSX.Element}
 */
export const SelectGroup = <TFormValues extends FieldValues>({
  id,
  disabled,
  onChange,
  label,
  options,
  defaultValue,
  intent,
}: SelectGroupProps<TFormValues>): JSX.Element => {
  const { t } = useTranslation();

  const { error } = useFieldValidationError<TFormValues>(id);

  return (
    <ElementGroupWrapper>
      <CoreLabel
        error={!!error}
        inputId={id}
        label={label}
      />
      <CoreSelect
        defaultValue={defaultValue}
        disabled={disabled}
        error={!!error}
        id={id}
        intent={intent}
        options={options}
        onChange={onChange}
      />
      {error && error?.message && <CoreElementError message={t(error.message)} />}
    </ElementGroupWrapper>
  );
};
