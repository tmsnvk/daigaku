package net.tamasnovak.validation.annotations.optionalUuidConstraint;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Constraint(validatedBy = OptionalUuidConstraintValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface OptionalUuidConstraint {
  String message() default "Record with this id was not found.";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
