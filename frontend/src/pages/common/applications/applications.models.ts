/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the fields of an application record.
 */
export enum ApplicationField {
  COURSE = 'Course',
  UNIVERSITY = 'University',
  COUNTRY = 'Country',
  PROGRAMME_LENGTH = 'Programme Length',
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
  readonly applicationStatus: boolean;
  readonly interviewStatus: boolean;
  readonly offerStatus: boolean;
  readonly responseStatus: boolean;
  readonly finalDestinationStatus: boolean;
}

/**
 * Defines the core properties of a single column.
 */
export interface Column {
  /**
   * The column's id.
   */
  readonly id: string;

  /**
   * The column's name.
   */
  readonly name: string;

  /**
   * The flag indicating whether a column is considered to be core.
   */
  readonly isCoreColumn: boolean;

  /**
   * The column's visibility flag.
   */
  readonly isVisible: boolean;
}

/**
 * Defines the properties for managing column visibility on the Applications table page.
 */
export interface ColumnVisibility {
  /**
   * The current column configuration.
   */
  readonly columns: Array<Column>;

  /**
   * A method that toggles column visibility.
   */
  toggleColumnVisibility: (id: string) => void;
}

/**
 * Defines the properties for sorting columns on the Applications table page.
 */
export interface SetOrder {
  /**
   * A method that manages the sorting updates.
   */
  handleColumnSort: (columnId: string) => void;
}

/**
 * Defines the possible sorting options.
 */
export enum SortOrder {
  ASC,
  DESC,
}
