/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.validation.annotations.validenum;

import java.util.Arrays;
import java.util.List;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 *
 */
public class EnumValidator implements ConstraintValidator<ValidEnum, String> {
  private List<String> acceptedValues;
  private boolean ignoreCase;

  @Override
  public void initialize(ValidEnum annotation) {
    ignoreCase = annotation.ignoreCase();
    acceptedValues = Arrays.stream(annotation.enumClass().getEnumConstants())
                           .map(e -> ignoreCase ? e.name().toUpperCase() : e.name())
                           .toList();
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }

    return acceptedValues.contains(ignoreCase ? value.toUpperCase() : value);
  }
}
