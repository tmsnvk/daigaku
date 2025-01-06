/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/**
 * Defines the possible form options an unauthorised user can choose from on the application's home page.
 */
export enum FormType {
  LOGIN,
  REGISTER,
  RESET,
}

/**
 * Defines the structure for managing the state and rendering of an active component.
 */
export interface ActiveFormComponent {
  /**
   * The currently selected {@link FormType}.
   */
  readonly activeFormType: FormType;

  /**
   * The rendered element of the currently active component.
   */
  readonly activeFormComponent: JSX.Element;
}
