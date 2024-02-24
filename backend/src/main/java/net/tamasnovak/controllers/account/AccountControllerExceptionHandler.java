package net.tamasnovak.controllers.account;

import net.tamasnovak.exceptions.ErrorResponse;
import net.tamasnovak.exceptions.FormErrorException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public final class AccountControllerExceptionHandler {
  @ExceptionHandler(value = { FormErrorException.class })
  public ResponseEntity<ErrorResponse> handleBlankFormException(FormErrorException exception) {
    HttpStatus notAcceptableStatus = HttpStatus.NOT_ACCEPTABLE;

    ErrorResponse error = new ErrorResponse(
      notAcceptableStatus.value(),
      exception.getMessage(),
      System.currentTimeMillis()
    );

    return new ResponseEntity<>(error, notAcceptableStatus);
  }
}
