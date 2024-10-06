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

/* interface, type, enum imports */
import { Application } from './application.interface';

/**
 * @interface
 * @description
 * The interface represents a `react-router` Location object that contains a single {@link Application} object and its url path.
 *
 * @since 0.0.1
 */
export interface ApplicationLocation {
  readonly state: Application;
  readonly pathname: string;
}
