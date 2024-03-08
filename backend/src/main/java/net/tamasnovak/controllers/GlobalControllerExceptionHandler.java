package net.tamasnovak.controllers;

import net.tamasnovak.exceptions.dbReourseNotFound.DbResourceNotFoundException;
import net.tamasnovak.exceptions.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalControllerExceptionHandler {
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
