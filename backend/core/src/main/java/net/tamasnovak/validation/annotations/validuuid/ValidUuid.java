/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.validation.annotations.validuuid;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 * Custom Spring annotation validating string uuids.
 */
@Documented
@Constraint(validatedBy = ValidUuidValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidUuid {
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
