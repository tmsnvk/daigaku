/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions.controlleradvice;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.exceptions.FieldErrorDetail;
import net.tamasnovak.exceptions.InputExceptionResponse;
import net.tamasnovak.exceptions.invalidformfieldexception.FormValidationException;
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
 * The Core module's ControllerAdvice class collecting the various exceptions thrown by the module's methods.
 */
@ControllerAdvice
public class ControllerExceptionHandler {
  private static final String ROOT_ERROR_VALUE = "root";

  /**
   * {@link ConstraintViolationException} is thrown when a validation annotation fails on a JPA entity.
   * The {@link ConstraintViolationException#getConstraintViolations()} method provides the mapping of error messages to the
   * corresponding failed fields. Since the field names match the input names on the frontend, the errors can be directly displayed next
   * to the relevant input fields.
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link InputExceptionResponse} instance.
   */
  @ExceptionHandler(value = { ConstraintViolationException.class })
  public ResponseEntity<InputExceptionResponse> onEntityConstraintValidationException(ConstraintViolationException exception) {
    final List<FieldErrorDetail> errors = exception.getConstraintViolations().stream()
                                                   .map(
                                                     error -> new FieldErrorDetail(error.getPropertyPath().toString(), error.getMessage()))
                                                   .collect(Collectors.toList());
    final InputExceptionResponse response = new InputExceptionResponse(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.name(),
      ConstraintViolationException.class.getSimpleName(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * TODO
   *
   * @return A {@link ResponseEntity} containing an error status code and a {@link InputExceptionResponse} instance.
   */
  @ExceptionHandler(value = { MethodArgumentTypeMismatchException.class })
  public ResponseEntity<InputExceptionResponse> onMethodArgumentTypeMismatchException() {
    final List<FieldErrorDetail> errors = new ArrayList<>(List.of(new FieldErrorDetail(ROOT_ERROR_VALUE,
      ControllerExceptionMessages.INVALID_DATA)));
    final InputExceptionResponse response = new InputExceptionResponse(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.name(),
      MethodArgumentTypeMismatchException.class.getSimpleName(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * {@link MethodArgumentNotValidException} is thrown when a @Valid annotation fails in a controller-layer method.
   * The {@link MethodArgumentNotValidException#getBindingResult()} method provides the mapping of error messages to the corresponding
   * failed fields. Since the field names match the input names on the frontend, the errors can be directly displayed next to the
   * relevant input fields.
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link InputExceptionResponse} instance.
   */
  @ExceptionHandler(value = { MethodArgumentNotValidException.class })
  public ResponseEntity<InputExceptionResponse> onInvalidMethodArgumentException(MethodArgumentNotValidException exception) {
    final List<FieldErrorDetail> errors = exception.getBindingResult()
                                                   .getAllErrors()
                                                   .stream()
                                                   .map(error -> new FieldErrorDetail(((FieldError) error).getField(),
                                                     error.getDefaultMessage()))
                                                   .collect(Collectors.toList());
    final InputExceptionResponse response = new InputExceptionResponse(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.name(),
      MethodArgumentNotValidException.class.getSimpleName(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * TODO
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link InputExceptionResponse} instance.
   */
  @ExceptionHandler(value = { DataIntegrityViolationException.class })
  public ResponseEntity<InputExceptionResponse> onDataIntegrityViolationException(DataIntegrityViolationException exception) {
    final List<FieldErrorDetail> errors = new ArrayList<>(List.of(new FieldErrorDetail(ROOT_ERROR_VALUE,
      exception.getMessage())));
    final InputExceptionResponse response = new InputExceptionResponse(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.name(),
      DataIntegrityViolationException.class.getSimpleName(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * TODO
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link InputExceptionResponse} instance.
   */
  @ExceptionHandler(value = { DataRetrievalFailureException.class })
  public ResponseEntity<InputExceptionResponse> onDataRetrievalFailureException(DataRetrievalFailureException exception) {
    final List<FieldErrorDetail> errors = new ArrayList<>(List.of(new FieldErrorDetail(ROOT_ERROR_VALUE,
      exception.getMessage())));
    final InputExceptionResponse response = new InputExceptionResponse(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.name(),
      DataRetrievalFailureException.class.getSimpleName(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * TODO
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link InputExceptionResponse} instance.
   */
  @ExceptionHandler(value = { EntityNotFoundException.class })
  public ResponseEntity<InputExceptionResponse> onEntityNotFoundException(EntityNotFoundException exception) {
    final List<FieldErrorDetail> errors = new ArrayList<>(List.of(new FieldErrorDetail(ROOT_ERROR_VALUE,
      exception.getMessage())));
    final InputExceptionResponse response = new InputExceptionResponse(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.name(),
      EntityNotFoundException.class.getSimpleName(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * {@link BadCredentialsException} is thrown when a user tries logging in with invalid authentication details. To protect existing
   * accounts, the user is not notified whether their password was incorrect or they tried to log into a non-existing {@link Account}.
   *
   * @return A {@link ResponseEntity} containing an error status code and a {@link InputExceptionResponse} instance.
   */
  @ExceptionHandler(value = { BadCredentialsException.class })
  public ResponseEntity<InputExceptionResponse> onBadCredentialsException() {
    final List<FieldErrorDetail> errors = new ArrayList<>(List.of(new FieldErrorDetail(ROOT_ERROR_VALUE,
      ControllerExceptionMessages.INVALID_AUTHENTICATION)));
    final InputExceptionResponse response = new InputExceptionResponse(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.name(),
      BadCredentialsException.class.getSimpleName(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                         .body(response);
  }

  /**
   * TODO
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link InputExceptionResponse} instance.
   */
  @ExceptionHandler(value = { IllegalArgumentException.class })
  public ResponseEntity<InputExceptionResponse> onIllegalException(IllegalArgumentException exception) {
    final List<FieldErrorDetail> errors = new ArrayList<>(List.of(new FieldErrorDetail(ROOT_ERROR_VALUE,
      exception.getMessage())));
    final InputExceptionResponse response = new InputExceptionResponse(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.name(),
      IllegalArgumentException.class.getSimpleName(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * TODO: is this still in use?
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link InputExceptionResponse} instance.
   */
  @ExceptionHandler(value = { FormValidationException.class })
  public ResponseEntity<InputExceptionResponse> onFormValidationException(FormValidationException exception) {
    final List<FieldErrorDetail> errors = new ArrayList<>(List.of(new FieldErrorDetail(ROOT_ERROR_VALUE,
      exception.getMessage())));
    final InputExceptionResponse response = new InputExceptionResponse(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.name(),
      FormValidationException.class.getSimpleName(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * TODO
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link InputExceptionResponse} instance.
   */
  @ExceptionHandler(value = { IllegalStateException.class })
  public ResponseEntity<InputExceptionResponse> onIllegalStateException(IllegalStateException exception) {
    final List<FieldErrorDetail> errors = new ArrayList<>(List.of(new FieldErrorDetail(ROOT_ERROR_VALUE,
      exception.getMessage())));
    final InputExceptionResponse response = new InputExceptionResponse(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.name(),
      IllegalStateException.class.getSimpleName(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }
}
