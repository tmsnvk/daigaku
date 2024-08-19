package net.tamasnovak.validation.annotations.validuuid;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.UUID;

public class ValidUuidValidator implements ConstraintValidator<ValidUuid, String> {
  @Override
  public void initialize(ValidUuid constraintAnnotation) {
    ConstraintValidator.super.initialize(constraintAnnotation);
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
    try {
      UUID.fromString(value);

      return true;
    } catch (IllegalArgumentException | NullPointerException exception) {
      return false;
    }
  }
}
