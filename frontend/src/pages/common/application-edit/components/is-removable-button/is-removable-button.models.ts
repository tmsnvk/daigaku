/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutateFunction } from '@tanstack/react-query';

/**
 * Defines the return value properties of the {@link useToggleIsRemovable} custom hook.
 */
export interface HandleToggleIsRemovable {
  shouldBeRemoved: boolean;
  errorMessage: string;
  isPending: boolean;
  isError: boolean;
  mutate: UseMutateFunction<void, Error, void, unknown>;
}
