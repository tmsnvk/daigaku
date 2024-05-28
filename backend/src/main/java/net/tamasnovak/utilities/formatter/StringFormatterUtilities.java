package net.tamasnovak.utilities.formatter;

import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.stream.Collectors;

@Component
public final class StringFormatterUtilities {
  private StringFormatterUtilities() {}
// add check if string is empty
  public static String capitaliseWord(String word) {
    return Arrays.stream(word.trim().split("\\s+"))
      .map(element -> {
        if (!element.contains("-")) {
          return capitaliseWordWithoutSpecialCharacters(element);
        } else {
          return capitaliseWordsWithHyphen(element);
        }
      })
      .collect(Collectors.joining(" "));
  }

  public static String removeRolePrefix(String roleName) {
    String[] splitRole = roleName.split("_");
    String[] removePrefix = roleName.split("ROLE_");

    if (splitRole.length == 2) {
      return capitaliseWordWithoutSpecialCharacters(removePrefix[1]);
    }

    return capitaliseWordsWithUnderscore(removePrefix[1]);
  }

  private static String capitaliseWordWithoutSpecialCharacters(String word) {
    return Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase();
  }

  private static String capitaliseWordsWithHyphen(String word) {
    return Arrays.stream(word.split("-"))
      .map(element -> Character.toUpperCase(element.charAt(0)) + element.substring(1).toLowerCase())
      .collect(Collectors.joining("-"));
  }

  private static String capitaliseWordsWithUnderscore(String word) {
    return Arrays.stream(word.split("_"))
      .map(element -> Character.toUpperCase(element.charAt(0)) + element.substring(1).toLowerCase())
      .collect(Collectors.joining(" "));
  }
}
