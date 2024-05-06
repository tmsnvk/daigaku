package net.tamasnovak.annotations.uuidValidation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Constraint(validatedBy = UuidConstraintValidator.class)
@Target( { ElementType.FIELD, ElementType.PARAMETER, ElementType.TYPE_PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface UuidConstraint {
  String message() default "Invalid id.";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}
