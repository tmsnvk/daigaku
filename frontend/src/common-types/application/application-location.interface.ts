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
 * Defines a `react-router-dom` location object containing an {@link Application} object and its URL path.
 *
 * @since 0.0.1
 */
export interface ApplicationLocation {
  readonly state: Application;
  readonly pathname: string;
}
