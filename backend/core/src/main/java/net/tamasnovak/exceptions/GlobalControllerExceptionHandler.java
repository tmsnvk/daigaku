/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;
import net.tamasnovak.exceptions.invalidformfieldexception.InvalidFormFieldException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

/**
 * The Core module's central ControllerAdvice class collecting the various exceptions thrown by the module's methods.
 *
 * @since 0.0.1
 */
@ControllerAdvice
public class GlobalControllerExceptionHandler {
  @ExceptionHandler(value = { ConstraintViolationException.class })
  public ResponseEntity<Map<String, String>> onEntityConstraintValidationException(ConstraintViolationException exception) {
    final Map<String, String> errors = new HashMap<>();

    exception.getConstraintViolations()
             .forEach((error) -> errors.put("root", error.getMessage()));

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(errors);
  }

  @ExceptionHandler(value = { MethodArgumentTypeMismatchException.class })
  public ResponseEntity<Map<String, String>> onMethodArgumentTypeMismatchException() {
    final Map<String, String> response = createErrorResponse("The request contained invalid data.");

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  @ExceptionHandler(value = { MethodArgumentNotValidException.class })
  public ResponseEntity<List<FieldValidationErrorResponse>> onInvalidMethodArgumentException(MethodArgumentNotValidException exception) {
    final List<FieldValidationErrorResponse> response = exception.getBindingResult()
                                                                 .getAllErrors()
                                                                 .stream()
                                                                 .map(error -> new FieldValidationErrorResponse(
                                                                   ((FieldError) error).getField(), error.getDefaultMessage()))
                                                                 .collect(Collectors.toList());

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  @ExceptionHandler(value = { DataIntegrityViolationException.class })
  public ResponseEntity<Map<String, String>> onDataIntegrityViolationException(DataIntegrityViolationException exception) {
    final Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  @ExceptionHandler(value = { DataRetrievalFailureException.class })
  public ResponseEntity<Map<String, String>> onDataRetrievalFailureException(DataRetrievalFailureException exception) {
    final Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  @ExceptionHandler(value = { EntityNotFoundException.class })
  public ResponseEntity<Map<String, String>> onEntityNotFoundException(EntityNotFoundException exception) {
    final Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  @ExceptionHandler(value = { BadCredentialsException.class })
  public ResponseEntity<String> onBadCredentialsException() {
    final String response = "Incorrect authentication credentials were provided.";

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                         .body(response);
  }

  @ExceptionHandler(value = { IllegalArgumentException.class })
  public ResponseEntity<Map<String, String>> onIllegalException(IllegalArgumentException exception) {
    final Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  @ExceptionHandler(value = { InvalidFormFieldException.class })
  public ResponseEntity<Map<String, String>> onEntityNotFoundException(InvalidFormFieldException exception) {
    final Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  @ExceptionHandler(value = { IllegalStateException.class })
  public ResponseEntity<Map<String, String>> onIllegalStateException(IllegalStateException exception) {
    final Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  private Map<String, String> createErrorResponse(String errorMessage) {
    return new HashMap<>() {{
      put("root", errorMessage);
    }};
  }
}
