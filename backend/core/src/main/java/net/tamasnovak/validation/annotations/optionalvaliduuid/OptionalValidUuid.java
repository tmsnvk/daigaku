/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.validation.annotations.optionalvaliduuid;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 * TODO
 */
@Documented
@Constraint(validatedBy = OptionalValidUuidValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface OptionalValidUuid {
  /**
   * TODO
   *
   * @return
   */
  String message() default "Record with this id was not found.";

  /**
   * TODO
   *
   * @return
   */
  Class<?>[] groups() default {};

  /**
   * TODO
   *
   * @return
   */
  Class<? extends Payload>[] payload() default {};
}
