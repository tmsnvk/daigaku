/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.utils;

import java.util.Objects;

/**
 * A utility class providing String-related utility methods.
 *
 * @since 0.0.1
 */
public final class StringUtils {
  private StringUtils() {
    // Class should not be initialised.
  }

  /**
   * Checks whether two string objects are equal.
   *
   * @param string The first string.
   * @param stringToCheckAgainst The string to check against the first one.
   * @return boolean
   */
  public static boolean validateStringsAreEqual(final String string, final String stringToCheckAgainst) {
    return Objects.equals(string, stringToCheckAgainst);
  }
}
