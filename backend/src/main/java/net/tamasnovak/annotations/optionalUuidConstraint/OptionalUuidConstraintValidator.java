package net.tamasnovak.annotations.optionalUuidConstraint;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.UUID;

public class OptionalUuidConstraintValidator implements ConstraintValidator<OptionalUuidConstraint, String> {
  @Override
  public void initialize(OptionalUuidConstraint constraintAnnotation) {
    ConstraintValidator.super.initialize(constraintAnnotation);
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
    try {
      if (value.trim().isEmpty()) {
        return true;
      }

      UUID.fromString(value);

      return true;
    } catch (IllegalArgumentException | NullPointerException exception) {
      return false;
    }
  }
}
