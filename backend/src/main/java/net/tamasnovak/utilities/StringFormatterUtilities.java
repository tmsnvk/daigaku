package net.tamasnovak.utilities;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.stream.Collectors;

@Service
public class StringFormatterUtilities {
  public StringFormatterUtilities() {}

  public String capitaliseWord(String word) {
    return Arrays.stream(word.split("\\s+"))
      .map(element -> {
        if (!element.contains("-")) {
          return capitaliseWordWithoutHyphen(element);
        } else {
          return capitaliseWordsWithHyphen(element);
        }
      })
      .collect(Collectors.joining(" "));
  }

  private String capitaliseWordWithoutHyphen(String word) {
    return Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase();
  }

  private String capitaliseWordsWithHyphen(String word) {
    return Arrays.stream(word.split("-"))
      .map(element -> Character.toUpperCase(element.charAt(0)) + element.substring(1).toLowerCase())
      .collect(Collectors.joining("-"));
  }
}
