/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
 *
 * @since 0.0.1
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
