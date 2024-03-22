package net.tamasnovak.controllers;

import jakarta.mail.MessagingException;
import jakarta.validation.ConstraintViolationException;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
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
public final class GlobalControllerExceptionHandler {
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
  public ResponseEntity<Map<String, String>> handleMethodArgumentTypeMismatch() {
    Map<String, String> errors = new HashMap<>();
    errors.put("root", "Bad values were provided.");

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(errors);
  }

  @ExceptionHandler(value = { DataIntegrityViolationException.class })
  public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(DataIntegrityViolationException exception) {
    Map<String, String> errors = new HashMap<>();
    errors.put("root", exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(errors);
  }

  @ExceptionHandler(value = {
    MailSendException.class,
    MessagingException.class
  })
  public ResponseEntity<Map<String, String>> handleEmailSendingException(Exception exception) {
    Map<String, String> errors = new HashMap<>();
    errors.put("root", exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .body(errors);
  }

  @ExceptionHandler(value = { DbResourceNotFoundException.class })
  public ResponseEntity<Map<String, String>> handleNotFoundDbResourceException(DbResourceNotFoundException exception) {
    Map<String, String> errors = new HashMap<>();
    errors.put("root", exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.NOT_FOUND)
      .body(errors);
  }

  @ExceptionHandler(value = { BadCredentialsException.class })
  public ResponseEntity<Map<String, String>> handleAuthorisationException() {
    Map<String, String> errors = new HashMap<>();
    errors.put("root", "Bad credentials were provided.");

    return ResponseEntity
      .status(HttpStatus.UNAUTHORIZED)
      .body(errors);
  }
}
