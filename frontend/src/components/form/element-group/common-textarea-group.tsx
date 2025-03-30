/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* component imports */
import { CoreFormElementError, CoreFormElementLabel } from '..';
import { CoreTextareaElement } from '../core-element/core-textarea-element';

/* interface, type, enum imports */
import { TextareaElementGroup } from '@common-types';

/**
 * Defines the component's properties.
 */
interface CommonTextareaGroupProps<T extends FieldValues> extends TextareaElementGroup<T> {
  /**
   * The textarea's row size.
   */
  readonly rows: number;

  /**
   * The textarea's column size.
   */
  readonly cols: number;
}

/**
 * Renders a generic textarea element group instance integrated with the `react-hook-form` library.
 *
 * @param {CommonTextareaGroupProps<T>} props
 * @return {JSX.Element}
 */
export const CommonTextareaGroup = <T extends FieldValues>({
  validationRules,
  error,
  id,
  label,
  rows,
  cols,
  placeholder,
  intent,
  isDisabled,
}: CommonTextareaGroupProps<T>): JSX.Element => {
  return (
    <article className={'mb-20 flex w-[100%] flex-col items-center'}>
      <CoreFormElementLabel
        inputId={id}
        content={label}
      />
      <CoreTextareaElement
        validationRules={validationRules}
        id={id}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        isDisabled={isDisabled}
        isError={error !== undefined}
        intent={intent}
      />
      {error && <CoreFormElementError message={error} />}
    </article>
  );
};
