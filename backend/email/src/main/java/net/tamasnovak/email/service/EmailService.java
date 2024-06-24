package net.tamasnovak.email.service;

import net.tamasnovak.email.dtos.NewEmailDto;

public interface EmailService {
	void sendSimpleEmail(NewEmailDto newEmailDto);
}
