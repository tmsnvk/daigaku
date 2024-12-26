/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { Application } from '../api/application.models';

/**
 * Defines a `react-router-dom` location object containing an Application object and its URL path.
 */
export interface ApplicationLocation {
  /**
   * The Application object.
   */
  readonly state: Application;

  /**
   * The URL's path.
   */
  readonly pathname: string;
}
