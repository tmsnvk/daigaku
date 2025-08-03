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
import { ElementFetchWrapper } from '../form-support/element-fetch-wrapper.tsx';
import { ElementGroupWrapper } from '../form-support/element-group-wrapper.tsx';

/**
 * Defines the component's properties.
 *
 * @template TFormValues - The type of form values extending the `react-hook-form` library.
 */
interface SelectGroupWithFetchProps<TFormValues extends FieldValues> extends SelectHTMLAttributes<HTMLSelectElement> {
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
   *
   */
  readonly isLoading: boolean;

  /**
   *
   */
  readonly isFetchError: boolean;

  /**
   * The input element's style intent.
   */
  readonly intent: CoreSelectVariantIntent;

  /**
   *
   */
  onRetry: () => void;
}

/**
 * Renders a generic select element group instance integrated with the `react-hook-form` library.
 *
 * @param {SelectGroupWithFetchProps<TFormValues extends FieldValues>} props
 * @return {JSX.Element}
 */
export const SelectGroupWithFetch = <TFormValues extends FieldValues>({
  id,
  isLoading,
  isFetchError,
  disabled,
  onRetry,
  onChange,
  label,
  options,
  defaultValue,
  intent,
}: SelectGroupWithFetchProps<TFormValues>): JSX.Element => {
  const { t } = useTranslation();

  const { error } = useFieldValidationError<TFormValues>(id);

  return (
    <ElementFetchWrapper
      isError={isFetchError}
      isLoading={isLoading}
      onRetry={onRetry}
    >
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
    </ElementFetchWrapper>
  );
};
