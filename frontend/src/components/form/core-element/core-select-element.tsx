/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { ChangeEvent, JSX, ReactNode, SelectHTMLAttributes } from 'react';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

const coreSelectElementVariants = cva(
  joinTw('w-full h-20', 'px-4 pt-4', 'border-2', 'text-xl', 'rounded-xl', 'focus:outline-1'),
  {
    variants: {
      intent: {
        light: joinTw('bg-primary border-secondary', 'focus:placeholder:text-secondary-muted focus:outline-secondary'),
      },
      isDisabled: {
        false: 'cursor-pointer',
        true: joinTw('text-secondary-muted', 'cursor-not-allowed'),
      },
      isError: {
        true: joinTw('border-destructive', 'focus:outline-destructive'),
      },
    },
  },
);

/**
 */
export type CoreSelectElementVariantIntent = VariantProps<typeof coreSelectElementVariants>['intent'];

/**
 * Defines the component's properties.
 */
interface CoreSelectElementProps<T extends FieldValues>
  extends VariantProps<typeof coreSelectElementVariants>,
    SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * The select element's id.
   */
  readonly id: Path<T>;

  /**
   * Indicates whether the select element is disabled.
   */
  readonly isDisabled: boolean;

  /**
   * Indicates whether there is an error involving the element.
   */
  readonly isError: boolean;

  /**
   * The method invoked after the onChange handler is fired.
   */
  onChangeHandler?: (event: ChangeEvent<HTMLSelectElement>) => void;

  /**
   * The array of option values.
   */
  readonly options: ReactNode;

  /**
   * The select element's initial value.
   */
  readonly initialValue: string | number;
}

/**
 * Renders the core select element used throughout the application.
 *
 * @param {CoreSelectElementProps} props
 * @return {JSX.Element}
 */
export const CoreSelectElement = <T extends FieldValues>({
  id,
  isDisabled,
  isError,
  onChangeHandler,
  options,
  initialValue,
  intent,
}: CoreSelectElementProps<T>): JSX.Element => {
  const { register, setValue } = useFormContext<T>();

  return (
    <select
      {...register(id)}
      id={id}
      name={id}
      disabled={isDisabled}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        onChangeHandler?.(event);

        setValue(id, event.target.value as PathValue<T, Path<T>>, { shouldValidate: true, shouldDirty: true });
      }}
      className={joinTw(coreSelectElementVariants({ intent, isDisabled, isError }))}
    >
      <option
        hidden
        value={''}
      >
        {initialValue}
      </option>
      {options}
    </select>
  );
};
