/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;
import net.tamasnovak.artifact.account.account.entity.Account;
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
public class ControllerExceptionHandler {
  private static final String DEFAULT_ERROR_DETAIL_FIELDNAME_VALUE = "root";

  /**
   * {@link ConstraintViolationException} is thrown when a validation annotation fails on a JPA entity.
   * The {@link ConstraintViolationException#getConstraintViolations()} method provides the mapping of error messages to the
   * corresponding failed fields. Since the field names match the input names on the frontend, the errors can be directly displayed next
   * to the relevant input fields.
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link ExceptionResponse} instance.
   */
  @ExceptionHandler(value = { ConstraintViolationException.class })
  public ResponseEntity<ExceptionResponse> onEntityConstraintValidationException(ConstraintViolationException exception) {
    final List<ErrorDetail> errors = exception.getConstraintViolations().stream()
                                              .map(error -> new ErrorDetail(error.getPropertyPath().toString(), error.getMessage()))
                                              .collect(Collectors.toList());
    final ExceptionResponse response = new ExceptionResponse(HttpStatus.BAD_REQUEST.value(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * TODO
   *
   * @return A {@link ResponseEntity} containing an error status code and a {@link ExceptionResponse} instance.
   */
  @ExceptionHandler(value = { MethodArgumentTypeMismatchException.class })
  public ResponseEntity<ExceptionResponse> onMethodArgumentTypeMismatchException() {
    final List<ErrorDetail> errors = new ArrayList<>(List.of(new ErrorDetail(DEFAULT_ERROR_DETAIL_FIELDNAME_VALUE,
      ControllerExceptionMessages.INVALID_DATA)));
    final ExceptionResponse response = new ExceptionResponse(HttpStatus.BAD_REQUEST.value(), Instant.now(), errors);

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
   * @return A {@link ResponseEntity} containing an error status code and a {@link ExceptionResponse} instance.
   */
  @ExceptionHandler(value = { MethodArgumentNotValidException.class })
  public ResponseEntity<ExceptionResponse> onInvalidMethodArgumentException(MethodArgumentNotValidException exception) {
    final List<ErrorDetail> errors = exception.getBindingResult()
                                              .getAllErrors()
                                              .stream()
                                              .map(error -> new ErrorDetail(((FieldError) error).getField(), error.getDefaultMessage()))
                                              .collect(Collectors.toList());
    final ExceptionResponse response = new ExceptionResponse(HttpStatus.BAD_REQUEST.value(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * TODO
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link ExceptionResponse} instance.
   */
  @ExceptionHandler(value = { DataIntegrityViolationException.class })
  public ResponseEntity<ExceptionResponse> onDataIntegrityViolationException(DataIntegrityViolationException exception) {
    final List<ErrorDetail> errors = new ArrayList<>(List.of(new ErrorDetail(DEFAULT_ERROR_DETAIL_FIELDNAME_VALUE,
      exception.getMessage())));
    final ExceptionResponse response = new ExceptionResponse(HttpStatus.BAD_REQUEST.value(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * TODO
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link ExceptionResponse} instance.
   */
  @ExceptionHandler(value = { DataRetrievalFailureException.class })
  public ResponseEntity<ExceptionResponse> onDataRetrievalFailureException(DataRetrievalFailureException exception) {
    final List<ErrorDetail> errors = new ArrayList<>(List.of(new ErrorDetail(DEFAULT_ERROR_DETAIL_FIELDNAME_VALUE,
      exception.getMessage())));
    final ExceptionResponse response = new ExceptionResponse(HttpStatus.BAD_REQUEST.value(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * TODO
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link ExceptionResponse} instance.
   */
  @ExceptionHandler(value = { EntityNotFoundException.class })
  public ResponseEntity<ExceptionResponse> onEntityNotFoundException(EntityNotFoundException exception) {
    final List<ErrorDetail> errors = new ArrayList<>(List.of(new ErrorDetail(DEFAULT_ERROR_DETAIL_FIELDNAME_VALUE,
      exception.getMessage())));
    final ExceptionResponse response = new ExceptionResponse(HttpStatus.BAD_REQUEST.value(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * {@link BadCredentialsException} is thrown when a user tries logging in with invalid authentication details. To protect existing
   * accounts, the user is not notified whether their password was incorrect or they tried to log into a non-existing {@link Account}.
   *
   * @return A {@link ResponseEntity} containing an error status code and a {@link ExceptionResponse} instance.
   */
  @ExceptionHandler(value = { BadCredentialsException.class })
  public ResponseEntity<ExceptionResponse> onBadCredentialsException() {
    final List<ErrorDetail> errors = new ArrayList<>(List.of(new ErrorDetail(DEFAULT_ERROR_DETAIL_FIELDNAME_VALUE,
      ControllerExceptionMessages.INVALID_AUTHENTICATION)));
    final ExceptionResponse response = new ExceptionResponse(HttpStatus.UNAUTHORIZED.value(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                         .body(response);
  }

  /**
   * TODO
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link ExceptionResponse} instance.
   */
  @ExceptionHandler(value = { IllegalArgumentException.class })
  public ResponseEntity<ExceptionResponse> onIllegalException(IllegalArgumentException exception) {
    final List<ErrorDetail> errors = new ArrayList<>(List.of(new ErrorDetail(DEFAULT_ERROR_DETAIL_FIELDNAME_VALUE,
      exception.getMessage())));
    final ExceptionResponse response = new ExceptionResponse(HttpStatus.BAD_REQUEST.value(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * TODO
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link ExceptionResponse} instance.
   */
  @ExceptionHandler(value = { InvalidFormFieldException.class })
  public ResponseEntity<ExceptionResponse> onEntityNotFoundException(InvalidFormFieldException exception) {
    final List<ErrorDetail> errors = new ArrayList<>(List.of(new ErrorDetail(DEFAULT_ERROR_DETAIL_FIELDNAME_VALUE,
      exception.getMessage())));
    final ExceptionResponse response = new ExceptionResponse(HttpStatus.BAD_REQUEST.value(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }

  /**
   * TODO
   *
   * @param exception The exception instance.
   * @return A {@link ResponseEntity} containing an error status code and a {@link ExceptionResponse} instance.
   */
  @ExceptionHandler(value = { IllegalStateException.class })
  public ResponseEntity<ExceptionResponse> onIllegalStateException(IllegalStateException exception) {
    final List<ErrorDetail> errors = new ArrayList<>(List.of(new ErrorDetail(DEFAULT_ERROR_DETAIL_FIELDNAME_VALUE,
      exception.getMessage())));
    final ExceptionResponse response = new ExceptionResponse(HttpStatus.BAD_REQUEST.value(), Instant.now(), errors);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                         .body(response);
  }
}
