package net.tamasnovak.controllers.account;

import net.tamasnovak.exception.FormErrorException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public final class AccountControllerExceptionHandler {
  @ExceptionHandler(value = { FormErrorException.class })
  public ResponseEntity<AccountErrorResponse> handleBlankFormException(FormErrorException exception) {
    HttpStatus notAcceptableStatus = HttpStatus.NOT_ACCEPTABLE;

    AccountErrorResponse error = new AccountErrorResponse(
      notAcceptableStatus.value(),
      exception.getMessage(),
      System.currentTimeMillis()
    );

    return new ResponseEntity<>(error, notAcceptableStatus);
  }
}
