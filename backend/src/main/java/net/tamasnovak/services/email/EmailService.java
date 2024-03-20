package net.tamasnovak.services.email;

import net.tamasnovak.dtos.email.NewEmailDto;

public interface EmailService {
  void sendEmail(NewEmailDto newEmailDto);
}
