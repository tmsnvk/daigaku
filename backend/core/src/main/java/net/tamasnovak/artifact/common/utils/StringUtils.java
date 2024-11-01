/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.common.utils;

import java.util.Objects;

/**
 * A utility class provided String-related utility methods.
 *
 * @since 0.0.1
 */
public final class StringUtils {
  private StringUtils() {
    // Class should not be initialised.
  }

  /**
   * Checks whether two strings are equal.
   *
   * @param string The first string.
   * @param stringToCheckAgainst The string to check against the first one.
   * @return boolean
   */
  public static boolean areEqual(final String string, final String stringToCheckAgainst) {
    return Objects.equals(string, stringToCheckAgainst);
  }
}
