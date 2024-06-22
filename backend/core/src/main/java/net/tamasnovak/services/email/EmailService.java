package net.tamasnovak.services.email;

import net.tamasnovak.services.email.dtos.NewEmailDto;

public interface EmailService {
  void sendSimpleEmail(NewEmailDto newEmailDto);
}
