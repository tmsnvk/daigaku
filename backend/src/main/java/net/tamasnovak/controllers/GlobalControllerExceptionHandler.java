package net.tamasnovak.controllers;

import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalControllerExceptionHandler {
  @ExceptionHandler(value = { ConstraintViolationException.class })
  public ResponseEntity<Map<String, String>> handleEntityConstraintValidationException(ConstraintViolationException exception) {
    Map<String, String> errors = new HashMap<>();
    exception.getConstraintViolations()
      .forEach((error) -> errors.put(error.getPropertyPath().toString(), error.getMessage()));

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(errors);
  }

  @ExceptionHandler(value = { MethodArgumentTypeMismatchException.class })
  public ResponseEntity<Map<String, String>> handleMethodArgumentTypeMismatchException() {
    Map<String, String> response = createErrorResponse("The request contained invalid data.");

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(response);
  }

  @ExceptionHandler(value = { DataIntegrityViolationException.class })
  public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(DataIntegrityViolationException exception) {
    Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(response);
  }

  @ExceptionHandler(value = { DataRetrievalFailureException.class })
  public ResponseEntity<Map<String, String>> handleDataRetrievalFailureException(DataRetrievalFailureException exception) {
    Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(response);
  }

  @ExceptionHandler(value = { EntityNotFoundException.class })
  public ResponseEntity<Map<String, String>> handleEntityNotFoundException(EntityNotFoundException exception) {
    Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(response);
  }

  @ExceptionHandler(value = {
    MailSendException.class,
    MessagingException.class
  })
  public ResponseEntity<Map<String, String>> handleEmailSendingException(Exception exception) {
    Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .body(response);
  }

  @ExceptionHandler(value = { BadCredentialsException.class })
  public ResponseEntity<Map<String, String>> handleBadCredentialsException() {
    Map<String, String> response = createErrorResponse("Bad credentials were provided.");

    return ResponseEntity
      .status(HttpStatus.UNAUTHORIZED)
      .body(response);
  }

  @ExceptionHandler(value = { IllegalArgumentException.class })
  public ResponseEntity<Map<String, String>> handleIllegalException(IllegalArgumentException exception) {
    Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(response);
  }

  private Map<String, String> createErrorResponse(String errorMessage) {
    return new HashMap<>(){{
      put("root", errorMessage);
    }};
  }
}
