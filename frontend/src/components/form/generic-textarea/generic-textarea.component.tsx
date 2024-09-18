/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* component, style imports */
import { BaseTextarea } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* interface, type, enum imports */
import { FormFieldValidation } from '@common-types';

/**
 * ===============
 * Styled Component {@link GenericTextarea}
 * ===============
 */

/* interfaces, types, enums */
interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  validationRules?: FormFieldValidation;
  error: string | undefined;
  id: Path<T>;
  label: string;
  rows: number;
  cols: number;
  placeholder: string;
  isDisabled: boolean;
}

/*
 * component - TODO - add functionality description
 */
export const GenericTextarea = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  label,
  rows,
  cols,
  placeholder,
  isDisabled,
}: ComponentProps<T>) => {
  return (
    <BaseTextarea $isError={error !== undefined}>
      <InputLabel
        fieldId={id}
        content={label}
      />
      <textarea
        {...register(id, validationRules)}
        id={id}
        name={id}
        rows={rows}
        cols={cols}
        autoComplete={'off'}
        placeholder={placeholder}
        disabled={isDisabled}
      />
      {error && <InputError errorText={error} />}
    </BaseTextarea>
  );
};
