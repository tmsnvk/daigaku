/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the fields of an {@link Application} object.
 */
export enum ApplicationField {
  COURSE = 'Course',
  UNIVERSITY = 'University',
  COUNTRY = 'Country',
  APPLICATION_STATUS = 'Application Status',
  INTERVIEW_STATUS = 'Interview Status',
  OFFER_STATUS = 'Offer Status',
  RESPONSE_STATUS = 'Response Status',
  FINAL_DESTINATION_STATUS = 'Final Destination Status',
}

/**
 * Defines the properties of what a single column can display.
 */
export interface ColumnConfig {
  applicationStatus: boolean;
  interviewStatus: boolean;
  offerStatus: boolean;
  responseStatus: boolean;
  finalDestinationStatus: boolean;
}

/**
 * Defines the core properties of a single column.
 */
export interface Column {
  readonly id: string;
  readonly name: string;
  readonly isCoreColumn: boolean;
  readonly isVisible: boolean;
}

/**
 * Defines the return value properties of the {@link useColumnVisibility} custom hook.
 */
export interface ColumnVisibility {
  /**
   * The current column configuration.
   */
  columns: Array<Column>;

  /**
   * A function to toggle column visibility.
   */
  toggleColumnVisibility: (id: string) => void;
}

/**
 * Defines the return value properties of the {@link useSortOrder} custom hook.
 */
export interface SetOrder {
  /**
   * A function that manages the sorting updates.
   */
  handleColumnSort: (columnId: string) => void;
}
