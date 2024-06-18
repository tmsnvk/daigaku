package net.tamasnovak.exceptions;

import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;
import net.tamasnovak.exceptions.invalidFormFieldException.InvalidFormFieldException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalControllerExceptionHandler {
  @ExceptionHandler(value = { ConstraintViolationException.class })
  public ResponseEntity<Map<String, String>> onEntityConstraintValidationException(ConstraintViolationException exception) {
    Map<String, String> errors = new HashMap<>();

    exception.getConstraintViolations()
      .forEach((error) -> errors.put("root", error.getMessage()));

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(errors);
  }

  @ExceptionHandler(value = { MethodArgumentTypeMismatchException.class })
  public ResponseEntity<Map<String, String>> onMethodArgumentTypeMismatchException() {
    Map<String, String> response = createErrorResponse("The request contained invalid data.");

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(response);
  }

  @ExceptionHandler(value = { MethodArgumentNotValidException.class })
  public ResponseEntity<Map<String, String>> onInvalidMethodArgumentExceptions(MethodArgumentNotValidException exception) {
    Map<String, String> response = new HashMap<>();

    exception.getBindingResult().getAllErrors()
      .forEach((error) -> {
        String fieldName = ((FieldError) error).getField();
        String errorMessage = error.getDefaultMessage();

        response.put(fieldName, errorMessage);
    });

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(response);
  }

  @ExceptionHandler(value = { DataIntegrityViolationException.class })
  public ResponseEntity<Map<String, String>> onDataIntegrityViolationException(DataIntegrityViolationException exception) {
    Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(response);
  }

  @ExceptionHandler(value = { DataRetrievalFailureException.class })
  public ResponseEntity<Map<String, String>> onDataRetrievalFailureException(DataRetrievalFailureException exception) {
    Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(response);
  }

  @ExceptionHandler(value = { EntityNotFoundException.class })
  public ResponseEntity<Map<String, String>> onEntityNotFoundException(EntityNotFoundException exception) {
    Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(response);
  }

  @ExceptionHandler(value = { MailSendException.class, MessagingException.class })
  public ResponseEntity<Map<String, String>> onEmailSendingException(Exception exception) {
    Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .body(response);
  }

  @ExceptionHandler(value = { BadCredentialsException.class })
  public ResponseEntity<Map<String, String>> onBadCredentialsException() {
    Map<String, String> response = createErrorResponse("Incorrect authentication credentials were provided.");

    return ResponseEntity
      .status(HttpStatus.UNAUTHORIZED)
      .body(response);
  }

  @ExceptionHandler(value = { IllegalArgumentException.class })
  public ResponseEntity<Map<String, String>> onIllegalException(IllegalArgumentException exception) {
    Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(response);
  }

  @ExceptionHandler(value = { InvalidFormFieldException.class })
  public ResponseEntity<Map<String, String>> onEntityNotFoundException(InvalidFormFieldException exception) {
    Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(response);
  }

  @ExceptionHandler(value = { FileNotFoundException.class })
  public ResponseEntity<Map<String, String>> onFileNotFoundException(FileNotFoundException exception) {
    Map<String, String> response = createErrorResponse(exception.getMessage());

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(response);
  }

  @ExceptionHandler(value = { IOException.class })
  public ResponseEntity<Map<String, String>> onIOException(IOException exception) {
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
