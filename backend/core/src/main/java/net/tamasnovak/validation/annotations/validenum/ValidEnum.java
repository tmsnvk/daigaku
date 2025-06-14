/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.validation.annotations.validenum;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 *
 */
@Documented
@Constraint(validatedBy = EnumValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidEnum {
  /**
   * TODO
   *
   * @return
   */
  String message() default "Invalid enum value";

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

  /**
   * TODO
   *
   * @return
   */
  Class<? extends Enum<?>> enumClass();

  /**
   * TODO
   *
   * @return
   */
  boolean ignoreCase() default true;
}
