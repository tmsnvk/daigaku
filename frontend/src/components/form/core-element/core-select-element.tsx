/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX, ReactNode, SelectHTMLAttributes } from 'react';
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

const coreSelectElementVariants = cva(
  joinTw('w-[95%] sm:w-[65%] h-20', 'px-4', 'border-2', 'text-xl', 'rounded-xl', 'focus:outline-1'),
  {
    variants: {
      intent: {
        light: joinTw('bg-primary border-secondary', 'focus:placeholder:text-secondary-muted focus:outline-secondary'),
      },
      isDisabled: {
        false: joinTw('cursor-pointer'),
        true: joinTw('text-secondary-muted', 'cursor-not-allowed'),
      },
      isError: {
        true: joinTw('border-destructive', 'focus:outline-destructive'),
      },
    },
  },
);

/**
 * Defines the component's properties.
 */
interface CoreSelectElementProps<T extends FieldValues>
  extends VariantProps<typeof coreSelectElementVariants>,
    SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Optional validation rules to handle the select element's validation using the `react-hook-form` library for
   * validation management.
   */
  readonly validationRules: RegisterOptions<FieldValues, Path<T>> | undefined;

  /**
   * The select element's id.
   */
  readonly id: Path<T>;

  /**
   * The select element's initial value.
   */
  readonly initialValue?: string | number;

  /**
   * The array of option values.
   */
  readonly options: Array<ReactNode>;

  /**
   * The select element's default option. The value is non-selectable and acts as a placeholder value.
   */
  readonly defaultOption: string;

  /**
   * Indicates whether the select element is disabled.
   */
  readonly isDisabled: boolean;

  /**
   * The method invoked after the onChange handler is fired.
   */
  onChangeHandler?: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  /**
   * Indicates whether there is an error involving the select element.
   */
  readonly isError: boolean;

  /**
   * Additional optional styling options.
   */
  readonly className?: string;
}

/**
 * Renders the core select element used throughout the application.
 *
 * @param {CoreSelectElementProps} props
 * @return {JSX.Element}
 */
export const CoreSelectElement = <T extends FieldValues>({
  validationRules,
  id,
  initialValue,
  isDisabled,
  isError,
  options,
  defaultOption,
  onChangeHandler,
  intent,
  className,
}: CoreSelectElementProps<T>): JSX.Element => {
  const { register } = useFormContext();

  return (
    <select
      {...register(id, validationRules)}
      id={id}
      name={id}
      disabled={isDisabled}
      onChange={onChangeHandler}
      className={joinTw(coreSelectElementVariants({ intent, isDisabled, isError, className }))}
    >
      <option
        hidden
        value={''}
      >
        {initialValue ?? defaultOption}
      </option>
      {options}
    </select>
  );
};
