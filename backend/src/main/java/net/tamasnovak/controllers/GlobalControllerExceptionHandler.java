package net.tamasnovak.controllers;

import jakarta.validation.ConstraintViolationException;
import net.tamasnovak.exceptions.FormErrorException;
import net.tamasnovak.exceptions.dbReourseNotFound.DbResourceNotFoundException;
import net.tamasnovak.exceptions.ErrorResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

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

  @ExceptionHandler(value = { DataIntegrityViolationException.class })
  public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(DataIntegrityViolationException exception) {
    Map<String, String> errors = new HashMap<>();
    errors.put("root", exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(errors);
  }

  @ExceptionHandler(value = { DbResourceNotFoundException.class })
  public ResponseEntity<ErrorResponse> handleNotFoundDbResourceException(DbResourceNotFoundException exception) {
    HttpStatus notFoundStatus = HttpStatus.NOT_FOUND;

    ErrorResponse error = new ErrorResponse(
      notFoundStatus.value(),
      exception.getMessage(),
      System.currentTimeMillis()
    );

    return new ResponseEntity<>(error, notFoundStatus);
  }
}
