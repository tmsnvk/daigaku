package net.tamasnovak.validation.annotations.optionalvaliduuid;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.UUID;

public class OptionalValidUuidValidator implements ConstraintValidator<OptionalValidUuid, String> {
  @Override
  public void initialize(OptionalValidUuid constraintAnnotation) {
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
