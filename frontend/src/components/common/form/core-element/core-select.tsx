/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { ChangeEvent, JSX, ReactNode, SelectHTMLAttributes } from 'react';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

const coreSelectVariants = cva(joinTw('w-full h-20 px-4 pt-4 border-2 text-xl rounded-xl', 'focus:outline-1'), {
  variants: {
    intent: {
      light: joinTw('bg-primary border-secondary', 'focus:placeholder:text-secondary-muted focus:outline-secondary'),
    },
  },
});

/**
 */
export type CoreSelectVariantIntent = VariantProps<typeof coreSelectVariants>['intent'];

/**
 * Defines the component's properties.
 */
interface CoreSelectProps<TFormValues extends FieldValues>
  extends VariantProps<typeof coreSelectVariants>,
    SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * The select element's id.
   */
  readonly id: Path<TFormValues>;

  /**
   * Indicates whether there is an error involving the element.
   */
  readonly error: boolean;

  /**
   * The array of option values.
   */
  readonly options: ReactNode;
}

/**
 * Renders the core select element used throughout the application.
 *
 * @param {CoreSelectProps} props
 * @return {JSX.Element}
 */
export const CoreSelect = <TFormValues extends FieldValues>({
  id,
  disabled,
  error,
  onChange,
  options,
  defaultValue,
  intent,
}: CoreSelectProps<TFormValues>): JSX.Element => {
  const { register, setValue } = useFormContext<TFormValues>();

  return (
    <select
      {...register(id)}
      className={joinTw(
        coreSelectVariants({ intent }),
        disabled ? 'text-secondary-muted cursor-not-allowed' : 'cursor-pointer',
        error && 'border-destructive focus:outline-destructive',
      )}
      disabled={disabled}
      id={id}
      name={id}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(event);

        setValue(id, event.target.value as PathValue<TFormValues, Path<TFormValues>>, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
    >
      <option
        hidden
        value={''}
      >
        {defaultValue}
      </option>
      {options}
    </select>
  );
};
