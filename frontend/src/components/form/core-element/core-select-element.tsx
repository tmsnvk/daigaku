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
  readonly options: ReactNode;

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
  onChangeHandler?: (event: ChangeEvent<HTMLSelectElement>) => void;

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
  const { register, setValue, trigger } = useFormContext<T>();

  return (
    <select
      {...register(id)}
      id={id}
      name={id}
      disabled={isDisabled}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        onChangeHandler?.(event);
        setValue(id, event.target.value as PathValue<T, Path<T>>, { shouldDirty: true });
        void trigger(id);
      }}
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
