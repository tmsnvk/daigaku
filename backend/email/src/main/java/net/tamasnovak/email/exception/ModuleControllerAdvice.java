package net.tamasnovak.email.exception;

import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ModuleControllerAdvice {
	@ExceptionHandler(value = { MailSendException.class, MessagingException.class })
	public ResponseEntity<Map<String, String>> onEmailSendingException(Exception exception) {
		final Map<String, String> response = createErrorResponse(exception.getMessage());

		return ResponseEntity
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body(response);
	}

	private Map<String, String> createErrorResponse(String errorMessage) {
		return new HashMap<>(){{
			put("root", errorMessage);
		}};
	}
}
