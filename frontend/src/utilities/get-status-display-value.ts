/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 *
 */
export type StatusMap<StatusKey extends string, StatusValue extends string> = Readonly<Record<StatusKey, StatusValue>>;

/**
 * A generic function to get the human-readable display value from any of your status enums.
 *
 * @param statusMap
 * @param statusKey
 * @returns
 */
export const getStatusDisplayValue = <
  StatusKey extends string,
  StatusValue extends string,
  StatusType extends StatusMap<StatusKey, StatusValue>,
>(
    statusMap: StatusType,
    statusKey: StatusKey | null | undefined,
  ): StatusValue | undefined => {
  if (statusKey && statusKey in statusMap) {
    return statusMap[statusKey];
  }

  return undefined;
};
