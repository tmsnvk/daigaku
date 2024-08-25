/**
 * @prettier
 */

import { Application } from './application.interface';

export interface Location {
  readonly state: Application;
  readonly pathname: string;
}
