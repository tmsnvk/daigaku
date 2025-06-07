/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { TFunction } from 'i18next';

/**
 * Defines a map where:
 * - `TRawStatusKey` is the original, raw string key (e.g., 'PLANNED', 'SUBMITTED').
 * - `TTranslationKey` is the specific string key used for i18n lookup (e.g., 'applicationStatusPlanned').
 */
export type StatusToTranslationKeyMap<TRawStatusKey extends string, TTranslationKey extends string> = Readonly<
  Record<TRawStatusKey, TTranslationKey>
>;

/**
 * A generic function to get the human-readable display value for any status.
 *
 * It takes a map that translates raw status keys (like those from your backend)
 * into the specific keys your i18n system uses for translations.
 *
 * @param statusTranslationMap The map that links raw status keys to i18n translation keys.
 * @param rawStatusKey The specific raw status key to get the display value.
 * @param t The i18n translation function.
 * @returns The translated human-readable string, or `undefined` if the key is not found.
 */
export const getStatusDisplayValue = <TRawStatusKey extends string, TTranslationKey extends string>(
  statusTranslationMap: StatusToTranslationKeyMap<TRawStatusKey, TTranslationKey>,
  rawStatusKey: TRawStatusKey | null | undefined,
  t: TFunction,
): string | undefined => {
  if (rawStatusKey && rawStatusKey in statusTranslationMap) {
    const translationKey = statusTranslationMap[rawStatusKey];

    return t(translationKey);
  }

  return undefined;
};
