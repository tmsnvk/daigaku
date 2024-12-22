/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { Application } from './application.interface';

/**
 * Defines a `react-router-dom` location object containing an {@link Application} object and its URL path.
 */
export interface ApplicationLocation {
  readonly state: Application;
  readonly pathname: string;
}
