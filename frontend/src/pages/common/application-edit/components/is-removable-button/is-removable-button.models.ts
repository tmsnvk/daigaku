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
 * Defines the return value properties for handling the toggling of a removable state.
 */
export interface HandleToggleIsRemovable {
  readonly shouldBeRemoved: boolean;
  readonly errorMessage: string;
  readonly isPending: boolean;
  readonly isError: boolean;
  mutate: UseMutateFunction<void, Error, void, unknown>;
}
